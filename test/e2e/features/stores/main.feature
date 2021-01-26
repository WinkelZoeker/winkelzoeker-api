Feature: Find nearest stores
	Clients should be able to send a request to our API in order to get the nearest stores.
	Our API should also validate the structure of the payload and respond with an error if it is invalid.

	Scenario: Empty Query params
		If the client sends a GET request to /stores with an empty query stirng, it should receive a response with 5 stores

		When the client creates a GET request to /stores
		And attaches an empty query string
		And sends the request
		Then our API should respond with a 200 HTTP status code
		And the payload of the response should be a JSON object
