export default function validacaoPorRegex(valor, regex) {
    switch (regex) {
        case "dataBrasileira":
            regex = /([0-9]{2})[\/]([0-9]{2})[\/]([0-9]*)/g;
            break;

        case "email":
            regex = /.+\@.+\..+/;
            break;

        case "celular":
            regex = /([+])([0-9]*) (\(?\d*\)?) \s?(\d{5})-(\d{4})/gi;
            break;

        default:
            regex = regex;
            break;
    }
    return (!valor || !valor.trim().length) || regex.test(valor)
}