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
		Then our API should respond with a <statusCode> HTTP status code

		Examples:
			| latitude | longitude | limit | statusCode |
			| 1.234567 | 7.654321  | empty | 200        |
			| 1.234567 | 7.654321  | 5     | 200        |


	Scenario Outline: Invalid Query params
		If the client sends a GET request to /stores with an invalid query string,
		it should receive an error response

		When the client creates a GET request to /v1/stores
		And attaches <latitude> and <longitude> as coordinates
		And attaches a limit of <limit> records
		And sends the request
		Then our API should respond with a <statusCode> HTTP status code

		Examples:
			| latitude | longitude | limit | statusCode |
			| empty    | empty     | 1     | 400        |
			| empty    | empty     | empty | 400        |
			| empty    | 7.654321  | empty | 400        |
			| 1.234567 | empty     | empty | 400        |
			| 1.234567 | empty     | A     | 400        |
			| A.BCDE   | 7.654321  | A     | 400        |



	Scenario Outline: Valid Query params - Output validation
		If the client sends a GET request to /stores with a valid query string,
		it should receive a response with a collection of stores nearest the
		geographical location sent

		When the client creates a GET request to /v1/stores
		And attaches the coordinates of <latitude> and <longitude> as coordinates from <city>
		And attaches a limit of <limit> records
		And sends the request
		Then our API should respond with a <statusCode> HTTP status code
		And the payload should be equal <result>

		Examples:
			| city      | latitude | longitude | limit | statusCode | result                                                                                                                       |
			| Eindhoven | 51.4416  | 5.4697    | 5     | 200        | 4oMKYx4Xt9oAAAFImNEYwKxK,NKkKYx4Xgo8AAAFIhH8YwKxK,WW8KYx4XcYwAAAFIay4YwKxK,xIoKYx4XBgEAAAFJKwoYZ4CR,_XMKYx4XNGEAAAFIpUsYwKxK |
			| Veghel    | 51.6158  | 5.5392    | 5     | 200        | 63UKYx4XPsEAAAFQvl1eATqA,w98KYx4X318AAAFIqFYYwKxK,SjwKYx4XWsYAAAFIpy8YwKxK,qe4KYx4X_K8AAAFIK0gYwKrH,8qQKYx4X2oEAAAFIsMYYwKxK |
			| Groningen | 53.2194  | 6.5665    | 5     | 200        | wfoKYx4X8M0AAAFbTipnB6J2,C.UKYx4XQgcAAAFJ76AFS1eI,P5YKYx4Xo9oAAAFI_LwYwKxK,yVUKYx4Xv0AAAAFIsxgYwKxK,B7gKYx4XsksAAAFIzK0YwKxK |
			| Den Haag  | 52.0705  | 4.3007    | 5     | 200        | xBUKYx4XtUsAAAFICDUYwKxK,QcIKYx4XHkIAAAFInukYwKxJ,du4KYx4XZeUAAAFIyF0YwKxK,ykYKYx4Xei8AAAFIfl0YwKxK,aAAKYx4XVlMAAAFLI7sJ5hoY |