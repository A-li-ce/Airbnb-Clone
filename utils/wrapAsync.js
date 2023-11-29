// function wrapAsync (func){
//     return function(req, res, next) {
//         func(req, res, next).catch(next);
//     }
// }

module.exports = (func) => {
    return (req, res, next) => {
        func (req, res, next).catch(next);
    }
}