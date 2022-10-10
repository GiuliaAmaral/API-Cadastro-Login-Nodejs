export default function respostaApi(response, statusCodigo, status, statusMotivo, resposta) {
    let returnRes = {
        status,
        statusMotivo,
        resposta
    };
    if (response != null) {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
        response.status(statusCodigo).json(returnRes);
    }
    return returnRes;
}