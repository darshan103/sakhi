import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Static fallback products
  const staticProducts = [
    {
      _id: "1",
      name: "Solar Panel 200W",
      description: "High-efficiency monocrystalline solar panel.",
      price: 7500,
      slug: "solar-panel-200w",
      photo:
        "https://cdn.thewirecutter.com/wp-content/media/2023/03/portable-solar-panels-2048px-goalzero-boulder100briefcase.jpg",
    },
    {
      _id: "2",
      name: "Smart Inverter 5KVA",
      description:
        "Powerful inverter with Wi-Fi control and battery management.",
      price: 14999,
      slug: "smart-inverter-5kva",
      photo:
        "https://cdn.thewirecutter.com/wp-content/media/2022/09/powerinverters-2048px-jackeryexplorer1500-inverter.jpg",
    },
    {
      _id: "3",
      name: "Lithium Battery Pack",
      description:
        "Long-lasting 12V 100Ah lithium battery for home and RV use.",
      price: 21000,
      slug: "lithium-battery-pack",
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2023/1/AN/MB/TP/57049600/lithium-battery-pack-1000x1000.jpg",
    },
    {
      _id: "4",
      name: "Lithium Battery Pack",
      description:
        "Long-lasting 12V 100Ah lithium battery for home and RV use.",
      price: 21000,
      slug: "lithium-battery-pack",
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2023/1/AN/MB/TP/57049600/lithium-battery-pack-1000x1000.jpg",
    }
  ];

  // ✅ Fetch Total Product Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.products?.length) setProducts(data.products);
      else setProducts(staticProducts);
    } catch (error) {
      setLoading(false);
      setProducts(staticProducts);
      console.log(error);
    }
  };

  // ✅ Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...(data?.products || [])]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // ✅ Setup
  useEffect(() => {
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page !== 1) loadMore();
  }, [page]);

  return (
    <Layout title="All Products - Best Offers">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase">
            <i className="bi bi-stars text-warning me-2"></i>Our Products
          </h2>
          <p className="text-muted mb-0">
            Explore top deals and trending solar equipment
          </p>
        </div>

        {/* Product Grid */}
        <div className="row g-4 justify-content-center">
          {products?.map((p) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={p._id}
            >
              <div className="card h-100 shadow-sm border-0 product-card">
                <div className="position-relative">
                  <img
                    src={p.photo || `/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top rounded-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                    New
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold">{p.name}</h6>
                  <p className="card-text text-muted small flex-grow-1">
                    {p.description?.substring(0, 60)}...
                  </p>
                  <h6 className="text-success fw-bold mb-3">
                    ₹ {p.price.toLocaleString()}
                  </h6>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary w-50 me-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>
                    <button className="btn btn-sm btn-primary w-50 ms-1">
                      <i className="bi bi-cart-plus me-1"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-5">
          {products && products.length < total && (
            <button
              className="btn btn-warning px-4 py-2 fw-semibold"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
