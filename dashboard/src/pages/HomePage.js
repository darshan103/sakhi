import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cardImg01 from "../assests/images/cardImg01.jpg";

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
      photo: cardImg01,
    },
    {
      _id: "2",
      name: "Smart Inverter 5KVA",
      description:
        "Powerful inverter with Wi-Fi control and battery management.",
      price: 14999,
      slug: "smart-inverter-5kva",
      photo: cardImg01,
    },
    {
      _id: "3",
      name: "Lithium Battery Pack",
      description:
        "Long-lasting 12V 100Ah lithium battery for home and RV use.",
      price: 21000,
      slug: "lithium-battery-pack",
      photo: cardImg01,
    },
    {
      _id: "4",
      name: "Lithium Battery Pack",
      description:
        "Long-lasting 12V 100Ah lithium battery for home and RV use.",
      price: 21000,
      slug: "lithium-battery-pack",
      photo: cardImg01,
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
    <Layout>
      <div className="container py-1">
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
                    className="card-img-top product-img"
                    alt={p.name}
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
