import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchContent = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setContent(response.data);
        } catch (error) {
          // If the token is invalid, navigate to login
          console.error("Error fetching main content:", error);
          navigate("/login");
        }
      } else {
        // If there is no token, navigate to login
        navigate("/login");
      }
    };

    fetchContent();
  }, [navigate]);

  return (
    <div>
      <h1>Main Page</h1>
      <p>{content}</p>
    </div>
  );
}

export default MainPage;
