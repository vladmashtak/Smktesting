var Review = require('./review.model').Review;

/**
 * Creates a new review
 */
function create(req, res, next) {

    var review = new Review({
        rate: req.body.rate,
        text: req.body.review,
        id_user: req.body.idUser,
        id_entry: req.params.id
    });
    review.save()
        .then(function(review) {
            res.json({review: review});
        })
        .catch(function(err) {
            console.log(err);
        });
}
module.exports.create = create;

function show(req, res, next) {

    var id = req.params.id;

    return Review.find({id_entry: id})
        .populate('id_user', 'name email')
        .exec()
        .then(function(reviews) {
            if (!reviews) {
                return res.status(404).end();
            }
            res.json({reviews: reviews});
        })
        .catch(function(err){
            next(err)
        });
}
module.exports.show = show;