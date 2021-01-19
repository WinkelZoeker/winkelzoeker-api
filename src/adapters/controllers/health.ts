export class HealthController  {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('ping', (req, res) => res.send(200, 'I am fine.'));
    }
}