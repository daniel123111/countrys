interface Country {
  name: { common: string; official: string };
  population: number;
  region: string;
  capital?: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  flags: { png: string };
}


const fetchCountriesData = async (): Promise<Country[]> => {
  const res = await fetch("./countries.json");
  if (!res.ok) throw new Error("Failed to load countries.json");
  return res.json();
};

const renderStatistics = (countries: Country[]) => {

  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);

  const currencyCount: { [key: string]: number } = {};

  countries.forEach((country) => {
    if (country.currencies) {
      Object.keys(country.currencies).forEach((currency) => {
        currencyCount[currency] = (currencyCount[currency] || 0) + 1;
      });
    }
  });

  const mostCommonCurrency = Object.entries(currencyCount).reduce(

    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ["None", 0]
  );

  const statsHTML = `
    <h2>Statistics</h2>
    <p><strong>Total Countries:</strong> ${countries.length}</p>
    <p><strong>Total Population:</strong> ${totalPopulation.toLocaleString()}</p>
    <p><strong>Average Population:</strong> ${Math.round(totalPopulation / countries.length).toLocaleString()}</p>
    <p><strong>Most Common Currency:</strong> ${mostCommonCurrency[0]} (${mostCommonCurrency[1]} countries)</p>
  `;

  document.getElementById("statistics")!.innerHTML = statsHTML;
};

const renderCountryTable = (countries: Country[]) => {
  const rows = countries
    .map(
      (c) => `
      <tr>
        <td>${c.name.common}</td>
        <td>${c.name.official}</td>
        <td>${c.population.toLocaleString()}</td>
        <td>${c.region}</td>
        <td>${c.capital?.join(", ") || "N/A"}</td>
        <td><img src="${c.flags.png}" alt="${c.name.common}" width="30"></td>
      </tr>
    `
    )
    .join("");

  document.getElementById("tableContainer")!.innerHTML = `
    <h2>Country List</h2>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Official Name</th>
          <th>Population</th>
          <th>Region</th>
          <th>Capital</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
};

const handleDisplay = async (filter: string = "") => {

  try {
    const countries = await fetchCountriesData();
    const filtered = filter
      ? countries.filter((c) =>
          c.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : countries;
    renderStatistics(filtered);
    renderCountryTable(filtered);
  }
   catch (err) {
    console.error(err);
    alert("Failed to fetch country data.");
  }
};

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("searchForm")!.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = (document.getElementById("countryInput") as HTMLInputElement).value.trim();
    handleDisplay(input);
  });

  document.getElementById("showAllButton")!.addEventListener("click", () => handleDisplay());
  handleDisplay();
});
