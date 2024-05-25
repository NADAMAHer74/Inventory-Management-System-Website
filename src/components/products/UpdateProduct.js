import React,{useState,useRef, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
// import { Alert } from 'react-bootstrap';
import axios from 'axios';
import Topbar from "../topbar/Topbar";
import { getAuthUser } from "../../helper/Storage";
import Alert from "react-bootstrap/Alert";

const UpdateProduct=()=> {

  let{id}= useParams();
  const auth = getAuthUser();
  const [data, setData] = useState({
    name: "",
    description: "",
    image_url: null,
    stock:"",
    warehouseID:"",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);

  const updateProduct = (e) => {
    e.preventDefault();

    setData({ ...data, loading: true });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("warehouseID", data.warehouseID);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
       .put('http://localhost:8081/product/'  + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setData({
          ...data,
          loading: false,
          success: "product updated successfully !",
          reload: data.reload + 1,
        });
      })
      .catch((err) => {
        setData({
          ...data,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/product/" + id)
      .then((res) => {
        setData({
          ...data,
          name: res.data.name,
          description: res.data.description,
          image_url: res.data.image_url,
          stock:"",
          warehouseID:"",
        });
      })
      .catch((err) => {
        setData({
          ...data,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [data.reload]);


  return (
    <div>
    <Topbar/>

    <div className="d-flex vh-100 justify-content-center align-items-center"
     style={{backgroundColor:"#ada79b"}}>
          <div className="w-50 bg-white rounded p-3">
          <h1> update new Product</h1>

          {data.err && (
        <Alert variant="danger" className="p-2">
          {data.err}
        </Alert>
      )}

      {data.success && (
        <Alert variant="success" className="p-2">
          {data.success}
        </Alert>
      )}

            <Form onSubmit={updateProduct} className="text-center py-2" >
            <img
          alt=""
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={data.image_url}
          />


        <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Product name"
         value={data.name}
                onChange={(e)=> setData({ ...data, name: e.target.value })}/>
        </Form.Group> 


        <Form.Group className="mb-3" >
      <textarea
      className='form-control'
      placeholder='Description' 
      value={data.description}
      onChange={(e)=> 
        setData({ ...data, description: e.target.value })
       } rows={5}></textarea>
    </Form.Group>   

    <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} />
        </Form.Group>
        
    <Form.Group className="mb-3" >
    <Form.Control 
        value={data.stock}
        onChange={(e)=> setData({ ...data, stock: e.target.value })}  
        type="text"
        required
         placeholder="stock"/>
         
    </Form.Group>  
    <Form.Group className="mb-3" >
    <Form.Control 
        value={data.warehouseID}
        onChange={(e)=> setData({ ...data, warehouseID: e.target.value })}  
        type="text"
        required
         placeholder="warehouse ID"/>
   </Form.Group> 
        <Button className='btn btn-dark w-100' variant='primary' type='submit'>
           Update Product
            </Button>
            </Form> 
  
    </div>
    </div>
    </div>
  );
}
export default UpdateProduct;
