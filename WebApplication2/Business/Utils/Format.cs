using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace WebApplication2.Business.Utils
{
    public static class Info
    {
        public static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }

        public static string ReplaceNonAlphanumericByUnderscore(string text)
        {

            return Regex.Replace(text, @"[^A-Za-z0-9]+", "_");
        }

        public static string ReplaceIllegalFilenameCharacterBySeparator(string fileName, string separator)
        {
            return Regex.Replace(fileName, @"[\\/:\u0022*?<>|]+", separator);
        }

        public static double RoundToSignificantDigits(double d, int digits)
        {
            if (d == 0)
                return 0;

            double scale = Math.Pow(10, Math.Floor(Math.Log10(Math.Abs(d))) + 1);
            return scale * Math.Round(d / scale, digits);
        }

        public static string replaceNumricFormat(string value2, string cultureFrom, string cultureTo)
        {
            System.Globalization.CultureInfo cultureInfoFrom = new System.Globalization.CultureInfo(cultureFrom);
            System.Globalization.CultureInfo cultureInfoTo = new System.Globalization.CultureInfo(cultureTo);

            string tmp2 = value2;

            var rgx = string.Format("\\{0}", cultureInfoFrom.NumberFormat.NumberGroupSeparator);
            var rgx2 = string.Format("\\{0}", cultureInfoFrom.NumberFormat.NumberDecimalSeparator);

            Regex rx = new Regex(rgx.ToString());
            Regex rx2 = new Regex(rgx2.ToString());
            Regex rx3 = new Regex("milhar");

            tmp2 = rx.Replace(tmp2, "milhar");
            tmp2 = rx2.Replace(tmp2, cultureInfoTo.NumberFormat.NumberDecimalSeparator);
            tmp2 = rx3.Replace(tmp2, cultureInfoTo.NumberFormat.NumberGroupSeparator);

            return tmp2;
        }

        public static string FormatNumbersInStringByCulture(string cultureFrom, string cultureTo, string value, int? signifDigits = null, int? scale = null)
        {
            System.Globalization.CultureInfo cultureInfoFrom = new System.Globalization.CultureInfo(cultureFrom);
            string numberGroupSeparator = cultureInfoFrom.NumberFormat.NumberGroupSeparator;
            string numberDecimalSeparator = cultureInfoFrom.NumberFormat.NumberDecimalSeparator;

            if (value != "" && value != null)
            {
                var rgx = "((^| )(<|)|\\+|-)(\\d{1,3}([" + numberGroupSeparator + "]\\d{3})*|\\d+)(([" + numberDecimalSeparator + "]\\d*|))(|[eE](|\\+|-)\\d*)($| |\\n)";

                Regex rx = new Regex(rgx);

                foreach (Match item in rx.Matches(value))
                {
                    var rgx2 = "(\\d{1,3}([" + numberGroupSeparator + "]\\d{3})*|\\d+)(([" + numberDecimalSeparator + "]\\d*|))(|[eE](|\\+|-)\\d*)($| |\\n)";

                    Regex rx2 = new Regex(rgx2);

                    var subItem = rx2.Match(item.ToString()).Value;
                    var newItem = subItem.ToString();

                    var valueFloat2 = float.Parse(newItem, cultureInfoFrom);



                    Regex rxCientific = new Regex("[eE](|\\+|-)\\d");
                    if (rxCientific.IsMatch(item.ToString()))
                    {
                        newItem = replaceNumricFormat(subItem.ToString(), cultureFrom, cultureTo);
                    }
                    else
                    {
                        if (signifDigits != null)
                        {
                            newItem = replaceNumricFormat(Math.Round(valueFloat2, (int)signifDigits).ToString(), cultureFrom, cultureTo);
                        }
                        else
                        {
                            if (scale != null)
                            {
                                newItem = valueFloat2.ToString(string.Format("F{0}", scale));
                                newItem = replaceNumricFormat(newItem, cultureFrom, cultureTo);

                            }
                            else
                            {
                                newItem = replaceNumricFormat(newItem, cultureFrom, cultureTo);
                            }
                        }
                    }



                    Regex rgxSpace = new Regex("/ $/");
                    value = value.Replace(item.ToString(), item.ToString().Replace(subItem.ToString(), newItem + (rgxSpace.IsMatch(subItem) ? " " : " ")));

                }

                return value;
            }
            else
            {
                return null;
            }
        }

        public static bool isFloat(string value)
        {

            double valueReturn = 0;

            bool isNumberValid = Double.TryParse(value, NumberStyles.Any, CultureInfo.CreateSpecificCulture("en-US"), out valueReturn);

            return isNumberValid;
        }

        public static bool isNumber(string value)
        {

            int valueReturn = 0;

            bool isNumberValid = int.TryParse(value, NumberStyles.Any, CultureInfo.CreateSpecificCulture("en-US"), out valueReturn);

            return isNumberValid;
        }

        public static bool isDate(string value)
        {

            DateTime dateValid;

            bool isNumberValid = DateTime.TryParse(value, out dateValid);

            return isNumberValid;
        }

        public static string FormatNumbersInString(string value, CultureInfo cultureFrom, CultureInfo cultureTo, int? signifDigits = null, int? scale = null, float? convertionFactor = null, bool cientificFormat = false, bool cientificFormatToInt = false)
        {
            if (value == null)
            {
                return null;
            }

            var replaceValue = value;

            string[] charsToRemove = new string[] { "<", ">", "*J" };

            foreach (var item in charsToRemove)
            {
                replaceValue = replaceValue.Replace(item, "");
            }
            replaceValue = replaceValue.Trim();

            // test parse to number
            double numberValue;
            if (!Double.TryParse(replaceValue, NumberStyles.Any, cultureFrom, out numberValue))
            {
                return value;
            }

            // convertion factor
            if (convertionFactor != null)
            {
                numberValue = (double)((decimal)numberValue * (decimal)convertionFactor);
            }

            // test number thousand digits
            if (!CheckThousands(replaceValue, cultureFrom))
            {
                return value;
            }

            // format scientific number
            if (replaceValue.IndexOf("E", StringComparison.OrdinalIgnoreCase) >= 0 || cientificFormat)
            {
                string tmp = null;

                // convertion factor
                if (convertionFactor != null || !(replaceValue.IndexOf("E", StringComparison.OrdinalIgnoreCase) >= 0) && cientificFormat)
                {
                    // format number with digits signif
                    if (signifDigits != null)
                    {
                        numberValue = RoundToSignificantDigits(numberValue, (int)signifDigits);
                    }

                    if (cientificFormatToInt)
                    {
                        tmp = numberValue.ToString("0." + (new String('0', 0)) + "E+0", new CultureInfo("en-US"));
                    }
                    else
                    {
                        tmp = numberValue.ToString("0." + (scale != null ? new String('0', (int)scale) : new String('#', numberValue.ToString().Length)) + "E+0", cultureTo);
                    }

                }
                else
                {
                    for (int i = 0; i < replaceValue.Length; i++)
                    {
                        var a = replaceValue[i].ToString();
                        tmp += (a == cultureFrom.NumberFormat.CurrencyGroupSeparator ? cultureTo.NumberFormat.CurrencyGroupSeparator : (a == cultureFrom.NumberFormat.NumberDecimalSeparator ? cultureTo.NumberFormat.NumberDecimalSeparator : a));
                    }
                }

                return value.Replace(replaceValue, tmp);
            }

            // format number with digits signif
            if (signifDigits != null)
            {
                return NumberText.FormatSignifDigits(numberValue,
                             (int)signifDigits,
                             replaceValue,
                             cultureFrom,
                             cultureTo,
                             value);

            }

            // format number with scale digits
            if (scale != null)
            {
                var tmp2 = numberValue.ToString(string.Format("###0.{0}", new String('0', (int)scale)), cultureTo);

                return value.Replace(replaceValue, tmp2);
            }

            //  without digits signif and scale digits
            string tmp3 = null;

            // convertion factor
            if (convertionFactor != null)
            {
                tmp3 = numberValue.ToString("#################0.##################", cultureTo);
            }
            else
            {
                for (int i = 0; i < replaceValue.Length; i++)
                {
                    var a = replaceValue[i].ToString();
                    tmp3 += (a == cultureFrom.NumberFormat.CurrencyGroupSeparator ? cultureTo.NumberFormat.CurrencyGroupSeparator : (a == cultureFrom.NumberFormat.NumberDecimalSeparator ? cultureTo.NumberFormat.NumberDecimalSeparator : a));
                }
            }

            return value.Replace(replaceValue, tmp3);
        }

        public static Boolean CheckThousands(String value, CultureInfo culture)
        {
            var indexOf = value.IndexOf(culture.NumberFormat.NumberDecimalSeparator);
            string tmp = null;

            if (indexOf >= 0)
            {
                tmp = value.Substring(0, indexOf);
            }
            else
            {
                tmp = value;
            }

            String[] parts = tmp.Split(new string[] { culture.NumberFormat.NumberGroupSeparator }, StringSplitOptions.None);
            for (int i = 1; i < parts.Length; i++)
            {
                var part = parts[i];
                int length = part.Length;
                if (culture.NumberFormat.NumberGroupSizes.Contains(length) == false)
                {
                    return false;
                }
            }

            return true;
        }

        public static string FormatNumber(float? number)
        {
            if (number != null)
                return number.Value.ToString(new String('#', 15) + "0." + new String('#', 16));
            else
                return number.ToString();
        }
    }

    public static class NumberText
    {
        public static string FormatNumbersInString(string value, CultureInfo cultureFrom, CultureInfo cultureTo, int? signifDigits = null, int? scale = null)
        {
            if (value == null)
            {
                return null;
            }

            var replaceValue = value;

            string[] charsToRemove = new string[] { "<", ">", "*J", "&gt;", "&lt;" };

            foreach (var item in charsToRemove)
            {
                replaceValue = replaceValue.Replace(item, "");
            }
            replaceValue = replaceValue.Trim();

            // Test parse to number
            double numberValue;
            if (!Double.TryParse(replaceValue, NumberStyles.Any, cultureFrom, out numberValue))
            {
                return value;
            }

            // Test number thousand digits
            if (!CheckThousands(replaceValue, cultureFrom))
            {
                return value;
            }

            // format scientific number
            if (replaceValue.IndexOf("E", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                string tmp = null;
                for (int i = 0; i < replaceValue.Length; i++)
                {
                    var a = replaceValue[i].ToString();
                    tmp += (a == cultureFrom.NumberFormat.CurrencyGroupSeparator ? cultureTo.NumberFormat.CurrencyGroupSeparator : (a == cultureFrom.NumberFormat.NumberDecimalSeparator ? cultureTo.NumberFormat.NumberDecimalSeparator : a));
                }

                return value.Replace(replaceValue, tmp);
            }

            // format number with digits signif
            if (signifDigits != null)
            {
                return FormatSignifDigits(numberValue, (int)signifDigits, replaceValue, cultureFrom, cultureTo, value);
            }

            // format number with scale digits
            if (scale != null)
            {
                //var tmp = Math.Round(numberValue, (int)scale);

                //var tmp2 = tmp.ToString(string.Format("#,##0.{0}", new String('0', (int)scale)), cultureTo);

                var tmp2 = numberValue.ToString(string.Format("###0.{0}", new String('0', (int)scale)), cultureTo);

                return value.Replace(replaceValue, tmp2);
            }

            var tmp3 = numberValue.ToString("###0.######", cultureTo);

            return value.Replace(replaceValue, tmp3);
        }

        public static string FormatSignifDigits(double numberValue, int signifDigits, string replaceValue, CultureInfo cultureFrom, CultureInfo cultureTo, string value)
        {
            var tmp = RoundToSignificantDigits(numberValue, signifDigits);
            var precisionSplit = replaceValue.Split(Convert.ToChar(cultureFrom.NumberFormat.NumberDecimalSeparator));

            var numPrecision = precisionSplit.Count() > 1 ? precisionSplit[1].Count() : 0;
            string returned = "";
            if (numPrecision > 0)
            {
                returned = value.Replace(replaceValue, tmp.ToString("N" + numPrecision, cultureTo));

                if (returned.Contains("N"))
                    returned = value.Replace(replaceValue, tmp.ToString("###0.######", cultureTo));
            }
            else
            {
                returned = value.Replace(replaceValue, tmp.ToString("###0.######", cultureTo));

            }

            var contartSignificantStart = 0;
            var Punctuation = false;

            char[] newItemClean = returned.ToArray();

            for (var count = 0; count < newItemClean.Count(); count++)
            {
                var objValue = newItemClean[count];

                if (count == 0)
                {
                    returned = "";
                }
                if (objValue == Convert.ToChar(cultureTo.NumberFormat.NumberDecimalSeparator))
                {
                    returned += objValue;
                    Punctuation = true;
                }
                else if (!char.IsNumber(objValue) && objValue != '.' && objValue != ',')
                {
                    returned += objValue;
                }
                else if (objValue == '0' && contartSignificantStart == 0)
                {
                    returned += objValue;
                }
                else if (objValue == '0' && contartSignificantStart > 0 && contartSignificantStart < signifDigits)
                {
                    returned += objValue;
                    contartSignificantStart += 1;
                }
                else if (objValue == '0' && contartSignificantStart > 0 && contartSignificantStart >= signifDigits && !Punctuation)
                {
                    returned += objValue;
                }
                else if (objValue != '0' && char.IsNumber(objValue) && contartSignificantStart < signifDigits)
                {
                    returned += objValue;
                    contartSignificantStart += 1;
                }
                else if (objValue != '0' && char.IsNumber(objValue) && contartSignificantStart >= signifDigits && !Punctuation)
                {
                    returned += '0';
                }

                //Monta as casas faltantes do algarismo significativo
                if (count == (newItemClean.Count() - 1) && contartSignificantStart < signifDigits && returned.TrimStart('0').Count() > 0)
                {
                    int countSignif = (int)signifDigits - contartSignificantStart;

                    var characteresNotNumber = returned.Trim().Where(c => !char.IsNumber(c) && c != Convert.ToChar(".") && c != Convert.ToChar(",")).ToArray();
                    returned = returned.TrimEnd(characteresNotNumber);

                    var characteresNotNumberEnd = string.Join("", characteresNotNumber);

                    characteresNotNumberEnd = characteresNotNumberEnd.TrimStart(returned.ToArray());

                    if (!Punctuation)
                        returned += cultureTo.NumberFormat.NumberDecimalSeparator;

                    //Regra a baixo remove números como 0,00000 ou < 0,000 *j
                    if (numberValue != 0)
                    {
                        returned += string.Join("", Enumerable.Repeat("0", countSignif).ToArray());
                    }
                    //Se o valor for igual a 0, e contém caracter na frente.
                    else if (characteresNotNumber.Count() > 0)
                    {
                        var characteresNotNumberStart = string.Join("", characteresNotNumber);
                        characteresNotNumberStart = characteresNotNumberStart.Length > 1 ? characteresNotNumberStart.TrimEnd(characteresNotNumberEnd.ToArray()) : characteresNotNumberStart;
                        returned = characteresNotNumberStart + " 0";
                    }
                    //Se o valor for apenas 0.
                    else
                    {
                        returned = "0";
                    }

                    returned += " " + characteresNotNumberEnd;
                }
            }

            if (returned.EndsWith(cultureTo.NumberFormat.NumberDecimalSeparator) || returned.EndsWith(cultureFrom.NumberFormat.NumberDecimalSeparator))
            {
                returned = returned.Substring(0, returned.Length - 1);
            }

            return returned;
        }

        public static Boolean CheckThousands(String value, CultureInfo culture)
        {
            var indexOf = value.IndexOf(culture.NumberFormat.NumberDecimalSeparator);
            string tmp = null;

            if (indexOf >= 0)
            {
                tmp = value.Substring(0, indexOf);
            }
            else
            {
                tmp = value;
            }

            String[] parts = tmp.Split(new string[] { culture.NumberFormat.NumberGroupSeparator }, StringSplitOptions.None);
            for (int i = 1; i < parts.Length; i++)
            {
                var part = parts[i];
                int length = part.Length;
                if (culture.NumberFormat.NumberGroupSizes.Contains(length) == false)
                {
                    return false;
                }
            }


            return true;
        }

        public static double RoundToSignificantDigits(double d, int digits)
        {
            if (d == 0)
                return 0;

            double scale = Math.Pow(10, Math.Floor(Math.Log10(Math.Abs(d))) + 1);
            return scale * Math.Round(d / scale, digits);
        }
    }
}