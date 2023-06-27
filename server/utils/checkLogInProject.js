export const checklogInProject = (req, res, next) => {
    function findElement(arr, val) {
        console.log(req)
        console.log(req.users)
        console.log(req.userId)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return val;
            }
        }
        return null;
    }
    const project = findElement(req.users, req.userId);
    if (project) {
        try {
            next()
        } catch (error) {
            return res.json({
                message: 'Немає доступу.',
            })
        }
    } else {
        return res.json({
            message: 'Немає доступу.',
        })
    }
}