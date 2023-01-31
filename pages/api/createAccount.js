import axios from 'axios'

export default async function createAccount(req, res) {

    try{
        if (req.method === 'POST'){

            let response = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_SERVER}/v1/user/createAccount`, req.body)
            
            res.status(201).json(response.data);
            
        }
    }catch(error){
        console.log(error);
        return res.status(500).json(error.data)
    }
  }