import axios from "axios";
import { useEffect, useState } from "react";
import cloudinaryImagesUploads from "../../components/cloudinaryImagesUploads";

const AddProduct = () => {
  const apiDomain = import.meta.env.VITE_API_URL;

  const initialFormData = {
    title: "",
    description: "",
    shortDescription: [],
    slug: "",
    category: "",
    subCategory: "",
    brand: "",

    price: 0,
    compareAtPrice: 0,
    costPrice: 0,

    stock: 0,
    lowStockThreshold: 5,
    specifications: [{ name: "", value: "" }],

    colors: [],
    sizes: [],

    weight: "",
    length: "",
    width: "",
    height: "",

    freeShipping: false,
    keywords: [],
  };
  const [formData, setFormData] = useState(initialFormData);

  const [images, setImages] = useState([]);
  const [shortDescription, setShortDescription] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [CategoriesData, setCategoriesData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (!colorInput.trim()) return;
    setFormData({
      ...formData,
      colors: [...formData.colors, colorInput.trim()],
    });

    setColorInput("");
  };

  const removeColor = (index) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const addSize = () => {
    if (!sizeInput.trim()) return;

    setFormData({
      ...formData,
      sizes: [...formData.sizes, sizeInput.trim()],
    });

    setSizeInput("");
  };

  const removeSize = (index) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index),
    });
  };

  const addShortDescription = () => {
    if (!shortDescription.trim()) return;
    setFormData({
      ...formData,
      shortDescription: [...formData.shortDescription, shortDescription.trim()],
    });

    setShortDescription("");
  };

  const removeShortDescription = (index) => {
    setFormData({
      ...formData,
      shortDescription: formData.shortDescription.filter((_, i) => i !== index),
    });
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    setFormData({
      ...formData,
      keywords: [...formData.keywords, keywordInput.trim()],
    });

    setKeywordInput("");
  };

  const removeKeyword = (index) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== index),
    });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: "", value: "" }],
    });
  };

  const removeSpecification = (index) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index),
    });
  };

  const handleSpecificationChange = (index, field, value) => {
    const updated = [...formData.specifications];

    updated[index][field] = value;

    setFormData({
      ...formData,
      specifications: updated,
    });
  };

  // Uploade New Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      alert("fill form data");
      return;
    }
    if (!images) {
      alert("image is required");
      return;
    }
    try {
      setLoading(true);

      // Upload image to Cloudinary
      const cloudinaryImage = await cloudinaryImagesUploads(images);

      const productData = { ...formData, images: cloudinaryImage };
      const { data } = await axios.post(
        `${apiDomain}/api/v1/product/create`,
        productData,
      );
      setLoading(false);
      // setFormData(initialFormData);
      if (!data.success) {
        throw new Error(data.message || "Category creation failed");
      }

      // setImage(null);
      // setImagePreview("");
    } catch (error) {
      console.error("Add category error:", error);
      setLoading(false);

      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiDomain}/api/v1/category/get`);
      setCategoriesData(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [1]);

  return (
    <div className="add-product-page">
      {/* HEADER */}
      <div className="product-page-header">
        <div>
          <h1>Add Product</h1>
          <p>Create a new product for your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* BASIC INFORMATION */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Basic Information</h2>
              <p>Enter the basic information about your product</p>
            </div>
          </div>

          <div className="form-group">
            <label>Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label>Short Description</label>

            <div className="tag-input">
              <input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="nike shoes, running shoes..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addShortDescription();
                  }
                }}
              />

              <button type="button" onClick={addShortDescription}>
                Add
              </button>
            </div>
            <div className="tags">
              {formData.shortDescription.map((desc, index) => (
                <span key={index}>
                  {desc}
                  <button
                    type="button"
                    onClick={() => removeShortDescription(index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write detailed product description..."
              rows="7"
              required
            />
          </div>

          <div className="form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="example-product-name"
              required
            />

            <small>URL: /product/example-product-name</small>
          </div>
        </section>

        {/* IMAGES */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Product Images</h2>
              <p>Add product images</p>
            </div>
          </div>

          <label className="image-upload">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            <div className="upload-icon">↑</div>

            <strong>Click to upload images</strong>

            <span>PNG, JPG or WEBP</span>
          </label>

          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map((image, index) => (
                <div className="image-preview" key={index}>
                  <img src={image.preview} alt="product" />

                  <button type="button" onClick={() => removeImage(index)}>
                    ×
                  </button>

                  {index === 0 && <span className="main-image">Main</span>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CATEGORY */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Category & Brand</h2>
              <p>Organize your product</p>
            </div>
          </div>

          <div className="two-column">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {CategoriesData.filter((category) => !category.parent)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Category</label>

              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {CategoriesData.filter((category) => category.parent)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Brand</label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Nike, Adidas, Apple..."
            />
          </div>
        </section>

        {/* PRICING */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Pricing</h2>
              <p>Set your product pricing</p>
            </div>
          </div>

          <div className="three-column">
            <div className="form-group">
              <label>Selling Price *</label>

              <div className="price-input">
                <span>₹</span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Selling Price"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Compare At Price</label>

              <div className="price-input">
                <span>₹</span>

                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  placeholder="Full Price without discount"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Cost Price</label>

              <div className="price-input">
                <span>₹</span>

                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder="Cost of your 1 Product"
                />
              </div>
            </div>
          </div>
        </section>

        {/* INVENTORY */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Inventory</h2>
              <p>Manage product stock</p>
            </div>
          </div>

          <div className="two-column">
            <div className="form-group">
              <label>Stock *</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>

              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </section>

        {/* COLORS & SIZES */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Product Options</h2>
              <p>Add colors and sizes</p>
            </div>
          </div>

          {/* COLORS */}

          <div className="form-group">
            <label>Colors</label>

            <div className="tag-input">
              <input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Enter color"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addColor();
                  }
                }}
              />

              <button type="button" onClick={addColor}>
                Add
              </button>
            </div>

            <div className="tags">
              {formData.colors.map((color, index) => (
                <span key={index}>
                  {color}

                  <button type="button" onClick={() => removeColor(index)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SIZES */}

          <div className="form-group">
            <label>Sizes</label>

            <div className="tag-input">
              <input
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder="Enter size"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSize();
                  }
                }}
              />

              <button type="button" onClick={addSize}>
                Add
              </button>
            </div>

            <div className="tags">
              {formData.sizes.map((size, index) => (
                <span key={index}>
                  {size}

                  <button type="button" onClick={() => removeSize(index)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Specifications</h2>
              <p>Add product specifications</p>
            </div>

            <button
              type="button"
              className="add-small-btn"
              onClick={addSpecification}
            >
              + Add Specification
            </button>
          </div>

          <div className="specifications">
            {formData.specifications.map((spec, index) => (
              <div className="spec-row" key={index}>
                <input
                  placeholder="Specification name"
                  value={spec.name}
                  onChange={(e) =>
                    handleSpecificationChange(index, "name", e.target.value)
                  }
                />

                <input
                  placeholder="Specification value"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationChange(index, "value", e.target.value)
                  }
                />

                {formData.specifications.length > 1 && (
                  <button
                    type="button"
                    className="remove-spec"
                    onClick={() => removeSpecification(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SHIPPING */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>Shipping</h2>
              <p>Product shipping information</p>
            </div>
          </div>

          <div className="four-column">
            <div className="form-group">
              <label>Weight (kg)</label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Length (cm)</label>

              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Width (cm)</label>

              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="freeShipping"
              checked={formData.freeShipping}
              onChange={handleChange}
            />

            <span>Free Shipping</span>
          </label>
        </section>

        {/* SEO */}

        <section className="product-card">
          <div className="section-title">
            <div>
              <h2>SEO</h2>
              <p>Improve product search visibility</p>
            </div>
          </div>

          <div className="form-group">
            <label>Keywords</label>

            <div className="tag-input">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="nike shoes, running shoes..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />

              <button type="button" onClick={addKeyword}>
                Add
              </button>
            </div>

            <div className="tags">
              {formData.keywords.map((keyword, index) => (
                <span key={index}>
                  {keyword}

                  <button type="button" onClick={() => removeKeyword(index)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM BUTTON */}

        <div className="product-submit">
          <button type="button" className="cancel-btn">
            Cancel
          </button>

          <button type="submit" className="save-product-btn" disabled={loading}>
            {loading ? "Uploading & Saving..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
