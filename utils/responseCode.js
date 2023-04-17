//Successful responses:
exports.ok=200;
exports.Internalservererror = 500; //Internal server error
exports.Notimplemented = 501; //Not implemented
exports.Bad_gateway = 502; //Bad gateway
exports.Success=503; //Service unavailable
exports.Gatewaytimeout = 504; //Gateway timeout
exports.Success=200; //OK
exports.Created = 201; //Created
exports.Accepted = 202; //Accepted
exports.Success=203; //Non - Authoritative Information
exports.NoContent = 204; //No Content
exports.ResetContent = 205; //Reset Content
exports.PartialContent = 206; //Partial Content
exports.MultiStatus = 207; //Multi - Status
exports.AlreadyReported = 208; //Already Reported
exports.IMUsed = 226; //IM Used
//Successful responses:

//Informational responses: Status codes
exports.Continue = 100; //Continue
exports.Success=101; //Switching Protocols
exports.Processing = 102; //Processing
exports.Success=103; //Early Hints
//Informational responses: Status codes

//// Client errors: Status codes
exports.Badrequest = 400; //Badr equest
exports.Unauthorized = 401; //Unauthorized
exports.Paymentrequired = 402; //Payment required
exports.Forbidden = 403; //Forbidden
exports.Notfound = 404; //Not found
exports.Methodnotallowed = 405; //Method not allowed
exports.Notacceptable = 406; //Not acceptable
exports.Gone = 410; //Gone
exports.PreconditionFailed = 412; //PreconditionFailed
// Client errors: Status codes