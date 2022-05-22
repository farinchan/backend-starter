const router = require("express").Router()
const tokenValidate = require("./verify_token")

router.get('/', tokenValidate, (req, res) => {
    res.json({
        title: "Example Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero turpis. Suspendisse venenatis, nunc nec aliquam mollis, mi libero aliquam nunc, ut condimentum odio metus id nisi. Sed ac ex placerat, egestas dui vel, fermentum leo. Fusce sed velit at enim tempus vehicula. Nulla maximus sit amet turpis id aliquam. Donec ut arcu hendrerit, convallis augue et, laoreet tortor. Proin interdum magna consectetur lacinia posuere. Sed erat nunc, laoreet sed justo id, dapibus imperdiet elit. Vestibulum sit amet ornare ipsum. Sed cursus metus non nisl euismod, eget mollis metus blandit. Nulla facilisi. "
    });
});

module.exports = router