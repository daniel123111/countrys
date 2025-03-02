var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
// Fetch countries from local JSON file
var fetchCountriesData = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("./countries.json")];
            case 1:
                res = _a.sent();
                if (!res.ok)
                    throw new Error("Failed to load countries.json");
                return [2 /*return*/, res.json()];
        }
    });
}); };
// Render statistics
var renderStatistics = function (countries) {
    var totalPopulation = countries.reduce(function (sum, c) { return sum + c.population; }, 0);
    // Calculate currency statistics
    var currencyUsage = {};
    countries.forEach(function (country) {
        if (country.currencies) {
            Object.keys(country.currencies).forEach(function (currency) {
                currencyUsage[currency] = (currencyUsage[currency] || 0) + 1;
            });
        }
    });
    // Find the most used currency
    var mostUsedCurrency = Object.entries(currencyUsage).sort(function (a, b) { return b[1] - a[1]; })[0];
    var statsHTML = "\n    <h2>Statistics</h2>\n    <p><strong>Total Countries:</strong> ".concat(countries.length, "</p>\n    <p><strong>Total Population:</strong> ").concat(totalPopulation.toLocaleString(), "</p>\n    <p><strong>Average Population:</strong> ").concat(Math.round(totalPopulation / countries.length).toLocaleString(), "</p>\n    <p><strong>Most Common Currency:</strong> ").concat(mostUsedCurrency ? "".concat(mostUsedCurrency[0], " (").concat(mostUsedCurrency[1], " countries)") : "N/A", "</p>\n  ");
    document.getElementById("statistics").innerHTML = statsHTML;
};
// Render country table
var renderCountryTable = function (countries) {
    var rows = countries
        .map(function (c) {
        var _a;
        return "\n      <tr>\n        <td>".concat(c.name.common, "</td>\n        <td>").concat(c.name.official, "</td>\n        <td>").concat(c.population.toLocaleString(), "</td>\n        <td>").concat(c.region, "</td>\n        <td>").concat(((_a = c.capital) === null || _a === void 0 ? void 0 : _a.join(", ")) || "N/A", "</td>\n        <td><img src=\"").concat(c.flags.png, "\" alt=\"").concat(c.name.common, "\" width=\"30\"></td>\n      </tr>\n    ");
    })
        .join("");
    document.getElementById("tableContainer").innerHTML = "\n    <h2>Country List</h2>\n    <table>\n      <thead>\n        <tr>\n          <th>Country</th>\n          <th>Official Name</th>\n          <th>Population</th>\n          <th>Region</th>\n          <th>Capital</th>\n          <th>Flag</th>\n        </tr>\n      </thead>\n      <tbody>".concat(rows, "</tbody>\n    </table>\n  ");
};
// Handle search or show all
var handleDisplay = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (filter) {
        var countries, filtered, err_1;
        if (filter === void 0) { filter = ""; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchCountriesData()];
                case 1:
                    countries = _a.sent();
                    filtered = filter
                        ? countries.filter(function (c) {
                            return c.name.common.toLowerCase().includes(filter.toLowerCase());
                        })
                        : countries;
                    renderStatistics(filtered);
                    renderCountryTable(filtered);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    alert("Failed to fetch country data.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("countryInput").value.trim();
        handleDisplay(input);
    });
    document.getElementById("showAllButton").addEventListener("click", function () { return handleDisplay(); });
    handleDisplay();
});
