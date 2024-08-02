const checkExistingParameter = (paramName) => {
    return (req, res, next) => {
        
        if ( paramName ) {
            console.log(paramName);
            next()
        } else {
            res.status(400).json({ error: 'invalid parameter' })
        }
    }
}

export default checkExistingParameter