import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCategory.css';

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        // Fetch existing categories from the backend
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:4000/categories');
            const data = await response.json();
            if (data.success) {
                setCategories(data.categories);
                console.log("data.categories", data.categories);
            } else {
                toast.error("Failed to fetch categories.");
            }
        };
        fetchCategories();
    }, []);

    const addCategoryHandler = async () => {
        if (categories.length >= 5) {
            toast.error("Maximum of 5 categories allowed.");
            return;
        }

        if (!newCategory) {
            toast.error("Category name cannot be empty.");
            return;
        }

        const response = await fetch('http://localhost:4000/addcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newCategory }),
        });
        const data = await response.json();

        if (data.success) {
            setCategories([...categories, data.category]);
            setNewCategory('');
            toast.success("Category added successfully.");
        } else {
            toast.error("Failed to add category.");
        }
    };

    const deleteCategoryHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        const response = await fetch(`http://localhost:4000/deletecategory/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();

        if (data.success) {
            setCategories(categories.filter(category => category._id !== id));
            toast.success("Category deleted successfully.");
        } else {
            toast.error("Failed to delete category.");
        }
    };

    return (
        <div className='add-category'>
            <h1>Manage Categories</h1>
            <div className='add-category-field'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='New Category Name'
                />
                <button onClick={addCategoryHandler}>Add Category</button>
            </div>
            <h4>List Categories</h4>
            <div className='category-list'>
                {categories.map((category) => (
                    <div key={category._id} className='category-item'>
                        <span>{category.name}</span>
                        <button onClick={() => deleteCategoryHandler(category._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddCategory;
