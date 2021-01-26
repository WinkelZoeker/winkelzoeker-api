Feature: Find nearest stores
	Clients should be able to send a request to our API in order to get the nearest stores.
	Our API should also validate the structure of the payload and respond with an error if it is invalid.

	Scenario Outline: Valid Query params
		If the client sends a GET request to /stores with a valid query string,
		it should receive a response with a collection of stores

		When the client creates a GET request to /v1/stores
		And attaches <latitude> and <longitude> as coordinates
		And attaches a limit of <limit> records
		And sends the request
		Then our API should respond with a 200 HTTP status code

		Examples:
			| latitude | longitude | limit |
			| empty    | empty     | 1     |
			| empty    | empty     | empty |
			| 1.234567 | 7.654321  | empty |
			| 1.234567 | 7.654321  | 5     |


	Scenario Outline: Invalid Query params
		If the client sends a GET request to /stores with an invalid query string,
		it should receive an error response

		When the client creates a GET request to /v1/stores
		And attaches <latitude> and <longitude> as coordinates
		And attaches a limit of <limit> records
		And sends the request
		Then our API should respond with a 400 HTTP status code

		Examples:
			| latitude | longitude | limit |
			| empty    | 7.654321  | empty |
			| 1.234567 | empty     | empty |
			| 1.234567 | empty     | A     |
			| A.BCDE   | 7.654321  | A     |
