
const asyncErrorHandler = (routeHandler) => async (req,res,next) => {
    try {
        await routeHandler(req,res,next);
    } catch (error) {
        next(error);
    }
}

// function func(fn){
//     return async function (req,res,next) {
//         try {
//             await fn(req,res,next)
//         } catch (err) {
//             next(err)
//         }
//     }
// }

export default asyncErrorHandler;