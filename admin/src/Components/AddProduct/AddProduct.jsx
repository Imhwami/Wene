import { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from "../../assets/upload_area.svg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: ""
    });

    // Fetch categories from the backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/categories');
                const data = await response.json();
                if (data.success) {
                    setCategories(data.categories);
                    console.log("data.categories",data.categories)
                } else {
                    toast.error("Failed to fetch categories.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching categories.");
            }
        };

        fetchCategories();
    }, []);

    const imageHandler = (e) => {
        const file = e.target.files[0];

        // Check if the file is a PNG
        if (file && file.type !== "image/png") {
            toast.error("Only .png files are allowed.");
            setImage(null);
            setProductDetails({ ...productDetails, image: "" });
            return;
        }

        // Check if the file size is under 2MB
        if (file && file.size > 2 * 1024 * 1024) {
            toast.error("File size must be under 2MB.");
            setImage(null);
            setProductDetails({ ...productDetails, image: "" });
            return;
        }

        // If no errors, set the image
        setImage(file);
        setProductDetails({ ...productDetails, image: file });
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
    
        if (name === 'new_price' || name === 'old_price') {
            if (/^\d*\.?\d*$/.test(value)) {
                setProductDetails({ ...productDetails, [name]: value });
            }
        } else {
            setProductDetails({ ...productDetails, [name]: value });
        }
    };

    const Add_Product = async () => {
        const { name, image, category, new_price, old_price } = productDetails;
    
        if (!name || !image || !category || !new_price || !old_price) {
            toast.error("All fields are required, including the image upload.");
            return;
        }
    
        let responseData;
        let product = productDetails;
    
        let formData = new FormData();
        formData.append('product', image);
    
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });
        
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success ? toast.success("Product Added") : toast.error("Failed");
            })
        }
    };
    
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title <span className="required">*</span></p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price <span className="required">*</span></p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price <span className="required">*</span></p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category <span className="required">*</span></p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="" disabled>Select a category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.name.toLowerCase()}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Image <span className="required">*</span></p>
                <h6 style={{marginTop:'-10px', marginBottom:'-15px', color: 'gray'}}>Maximum file size is 2 MB and the file type must be .png</h6>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' accept=".png" hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
            <ToastContainer />
        </div>
    )
}

export default AddProduct;
