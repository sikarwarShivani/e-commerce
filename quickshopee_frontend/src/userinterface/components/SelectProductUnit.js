
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { postData } from "../../NodeServices/FetchNodeServices";
import PlusMinusComponent from "./PlusMinusComponent";
import {Button} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"; 
export default function SelectProductUnit({ product ,refreshpage}) {
   
  const [units, setUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(product);
  const dispatch=useDispatch()
  
var cart=useSelector((state)=>state.products)
var cartItems=Object.values(cart)

const searchInCart=()=>{
  var searchProduct=cartItems.filter((item)=>{
    return item.productlistid==product.productlistid
  })
if(searchProduct?.length!=0)
{
  setSelectedProduct(searchProduct[0])
}
else{
  product['qty']=0
  setSelectedProduct(product)
}
 
}

useEffect(()=>{
  searchInCart()
},[])


  const fetchAllSubcategory = async () => {
    var result = await postData("userinterface/fetch_products_by_productid", {
      productId: product.productid,
    });

    setUnits(result.data);
  };

  useEffect(function () {
    fetchAllSubcategory();
  }, []);

  const handleClick = (item, index) => {
     item['qty']=0
    setSelectedProduct(item)
  };

  const fillAllUnit = () => {
    return units.map((item, index) => {
      return (
        <Box
          onClick={() => handleClick(item, index)}
          style={{
            cursor: "pointer",
            width: "20%",
            borderRadius: 20,
            background: "#f5f6fa",
            border:
               item.productlistid==selectedProduct.productlistid?
                 "2px solid #3498db"
                : "1px solid #74b9ff",
            marginLeft: "2%",
            marginTop: "2%",
          }}
        >
          {item.offer == 0 ? (
            <> </>
          ) : (
            <>
              <div
                style={{
                  borderBottomRightRadius: 4,
                  borderBottomLeftRadius: 4,
                  width: "40%",
                  marginLeft: "25%",
                  background: "#74b9ff",
                }}
              >
                <div
                  style={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 8,
                    fontFamily: "Poppins",
                  }}
                >
                  {parseInt(((item.rate - item.offer) / item.rate) * 100)}% OFF
                </div>
              </div>
            </>
          )}

          {item.offer == 0 ? (
            <>
              <div style={{ marginTop: "15%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 8,
                    fontFamily: "Poppins",
                    fontWeight: 300,
                  }}
                >
                  {item.weight} {item.type}
                </div>

                {item.offer == 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 10,
                        fontFamily: "Poppins",
                      }}
                    >
                      Out Off Stock
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 10,
                      }}
                    >
                      <div style={{ fontFamily: "Poppins" }}>
                        {item.offer == 0 ? (
                          <> &#8377;{item.rate}</>
                        ) : (
                          <s>&#8377;{item.rate} </s>
                        )}
                      </div>
                      <div
                        style={{
                          marginLeft: "8%",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {item.offer == 0 ? <> </> : <>&#8377;{item.offer}</>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 13,
                  fontFamily: "poppins",
                  fontWeight: "10%",
                }}
              >
                {item.weight} {item.Type}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                <div style={{ fontFamily: "Poppins" }}>
                  {item.offer == 0 ? (
                    <> &#8377;{item.rate}</>
                  ) : (
                    <s>&#8377;{item.rate}</s>
                  )}
                </div>
                <div
                  style={{
                    marginLeft: "5%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 10,
                  }}
                >
                  {item.offer == 0 ? <></> : <>&#8377; {item.offer} </>}
                </div>
              </div>
            </>
          )}
        </Box>
      );
    });
  };

  const handleQtyChange = (value) => {
    var product=selectedProduct
    if(value>=1){
    
    product['qty']=value
    dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
    }
    else
    {product['qty']=0
    dispatch({type:'Delete_PRODUCT',payload:[product.productlistid,product]})
    }
    refreshpage()
  };

  return (
    <div
      style={{
        width: "95%",
        marginLeft: "10%",
        padding: 5,
        fontFamily: "Poppins",
        marginTop: "1%",
      }}
    >
      <div>select Units</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{fillAllUnit()}</div>
      <PlusMinusComponent qty={selectedProduct?.qty} onChange={handleQtyChange} />
    </div>
  );
}

