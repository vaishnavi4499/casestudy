const express= require('express');
const router = express.Router ()
const axios=require('axios')

router.get('/:apiName',async (req,res)=>{
    let response=await axios({
        method:req.method,
        url: 'http://localhost:3000/user',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
       res.send(response.data)
})
/**get all the products in admin route */
router.get('/:apiName', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:3000/admin',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
    res.send(response.data)
})

/** get the product by id*/
router.get('/:apiName/:id', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:3000/admin/'+req.params.id,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    res.send(response.data)
})
/**post the products to the database */
router.post('/:apiName', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:3000/admin',
        data:req.body,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    res.send(response.data)
})
/**modify the products in admin route */
router.put('/:apiName/:id', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:3000/admin/' + req.params.id,
        data: req.body,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    res.send(response.data);

})
/**delete the product */
router.delete('/:apiName/:id', async (req, res) => {
    let response =  axios({
        method: req.method,
        url: 'http://localhost:3000/admin/'+req.params.id,
        data:req.body,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        
    })
    res.send(response.data);
})

/**modify the products in admin route */
router.put('/:apiName/:id',async (req,res)=>{
    let response = await axios({
        method: req.method,
        url: 'http://localhost:3000/admin/' + req.params.id,
        data:req.body
    })
    res.send(response.data);

})

/**get all the orders */
router.get('/:apiName', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:5000/orders',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
    res.send(response.data)
})
/** get the order by id*/
router.get('/:apiName/:id', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:5000/orders' + req.params.id,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    res.send(response.data);
})

/**post the product by id*/
router.post('/:apiName', async (req, res) => {
    let response = await axios({
        method: req.method,
        url: 'http://localhost:5000/orders',
        data: req.body,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    res.send(response.data)
})
module.exports=router