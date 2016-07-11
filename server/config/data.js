/**
 * Data for Data Base
 */

var Product = require('../api/product/product.model').Product;

var arrayProducts = [
    {
        "title": "Inrt",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Eiusmod deserunt tempor ullamco officia tempor tempor minim qui ut cupidatat ut nulla."
    },
    {
        "title": "Marvane",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Reprehenderit sunt consequat sint minim do."
    },
    {
        "title": "Vicon",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Dolor non consectetur ut cupidatat ut velit tempor."
    },
    {
        "title": "Rockabye",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Amet qui laboris mollit laborum reprehenderit nostrud."
    },
    {
        "title": "Bolax",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Laboris pariatur cupidatat veniam magna excepteur."
    },
    {
        "title": "Zensure",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Minim incididunt amet labore ipsum ad enim fugiat ea."
    },
    {
        "title": "Ecstasia",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Sunt cillum voluptate deserunt dolore commodo excepteur Lorem eu nulla ut ipsum veniam esse."
    },
    {
        "title": "Moltonic",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Velit non fugiat eiusmod labore qui aliqua cillum veniam laborum ut sint in."
    },
    {
        "title": "Emergent",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Amet magna ut occaecat qui eiusmod tempor tempor."
    },
    {
        "title": "Zork",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Reprehenderit qui consequat nostrud occaecat fugiat et sint nisi do."
    },
    {
        "title": "Exoswitch",
        "Image": "http://kevy.com/wp-content/uploads/2013/09/total-product-marketing.jpg",
        "text": "Sunt irure ullamco labore adipisicing ut irure dolor commodo officia irure dolor sit cupidatat ea."
    }
];

return Product.find({}).exec()
    .then(function (products) {
        if (!products) {
            for (var i = 0; i < arrayProducts.length; i++) {
                var product = new Product({
                    title: arrayProducts[i].title,
                    image: arrayProducts[i].Image,
                    text: arrayProducts[i].text
                });

                product.save();
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });



