var Product = require('./product.model').Product;

/**
 * Get list of product
 */
function index(req, res) {
    return Product.find({}).exec()
        .then(function(products) {
            res.status(200).json({data: products});
        })
        .catch(function(err){
            console.log(err);
        });
}
module.exports.index = index;

function show(req, res, next) {
    var id = req.params.id;

    return Product.findById(id).exec()
        .then(function(prod) {
            if (!prod) {
                return res.status(404).end();
            }

            res.json(prod.product);
        })
        .catch(function(err){
            next(err)
        });
}
module.exports.show = show;