import User from '../models/User';
class UserController{
    async store(req,res){
        
        const userExists = await User.findOne({where:{email:req.body.email}})

        if(userExists){
            return res.status(400).json({error:'User already exists'})
        }

        const {id,name,email,age,gender} = await User.create(req.body);
        return res.json({id,name,email,age,gender})
    }


    async update(req,res){
        const {email,oldPassword} = req.body;

        const user = await User.findByPk(req.userId) 

        if(email !== user.email){
            const userExists = await User.findOne({where:{email:user.email}})

            if(userExists){
                return res.status(400).json({error:'User already exists'})
            }    
        }
        if(oldPassword&&!(await user.checkPassword(oldPassword))){
            return res.status(401).json({error:'password does not match'})
        }

        const {id,name,studant} = await user.update(req.body)

        return res.json({
            id,
            name,
            email,
            studant
        })
    }
}

export default new UserController();