import { useEffect, useState } from "react";
import { IconShieldCheck } from "@tabler/icons-react"
import { PurchaseInfo } from "./PurchaseInfo";

export const Selection = () => {
  const [product, setProduct] = useState({
    version: "",
    model: "",
    color: "",
    storage: "",
  });

  const [price, setPrice] = useState(0);

  const handleSelect = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  useEffect(() => {
    const calculatePrice = () => {
      let calculatedPrice = 0;

      if (product.version === "14") {
        if (product.model === "14Base") {
          calculatedPrice += 2500000;
        } else if (product.model === "14Plus") {
          calculatedPrice += 2800000;
        }

        if (product.storage === "128GB") {
          calculatedPrice += 0;
        } else if (product.storage === "256GB") {
          calculatedPrice += 150000;
        } else if (product.storage === "512GB") {
          calculatedPrice += 250000;
        }
      } else if (product.version === "15") {
        if (product.model === "15Base") {
          calculatedPrice += 3100000;
        } else if (product.model === "15Plus") {
          calculatedPrice += 3600000;
        } else if (product.model === "15Pro") {
          calculatedPrice += 4200000;
        } else if (product.model === "15ProMax") {
          calculatedPrice += 4500000;
        }

        if (product.storage === "128GB") {
          calculatedPrice += 0;
        } else if (product.storage === "256GB") {
          calculatedPrice += 150000;
        } else if (product.storage === "512GB") {
          calculatedPrice += 250000;
        } else if (product.storage === "1TB") {
          calculatedPrice += 800000;
        }
      }

      return calculatedPrice;
    };

    const newPrice = calculatePrice();
    setPrice(newPrice);
  }, [product]);

  return (
    <div className="w-4/5 mx-auto py-8">
      <p className="font-bold text-2xl text-center mb-8">iPhone захиалах</p>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center bg-emerald-300 rounded-2xl p-4 mb-8">
            <IconShieldCheck />
            <p className="font-bold text-sm ml-4">Яагаад TechGrove хамгийн сайн сонголт вэ?</p>
          </div>
          <div className="bg-stone-200 rounded-2xl p-4 h-auto max-h-56">
            <p className="text-emerald-600">
              Яагаад манайхаар захиалах нь баталгаатай вэ?
            </p>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam porro rem reiciendis dicta natus, et totam a nesciunt
              sit. Animi odio deserunt recusandae provident quia vero id iste
              quam soluta?
            </p>
            <p className="text-emerald-600 mt-4">Захиалах шат дамжлага</p>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam porro rem reiciendis dicta natus, et totam a nesciunt
              sit. Animi odio deserunt recusandae provident quia vero id iste
              quam soluta?
            </p>
          </div>
        </div>

        <div className={product.model && product.color && product.storage ? 'pointer-events-none col-span-3 relative' : 'col-span-3 relative'}>
          {
            product.model && product.color && product.storage ?
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-stone-600 opacity-50 rounded-2xl ring-4 ring-stone-600"></div>
              :
              null
          }
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => handleSelect("version", "14")}
              className={`h-20 flex items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.version === "14" &&
                "border-none ring-4 ring-emerald-300"
                } delay-100 rounded-2xl`}
            >
              <p className="font-bold">iPhone 14</p>
            </button>
            <button
              onClick={() => handleSelect("version", "15")}
              className={`h-20 flex items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.version === "15" &&
                "border-none ring-4 ring-emerald-300"
                } delay-100 rounded-2xl py-8`}
            >
              <p className="font-bold">iPhone 15</p>
            </button>
          </div>
          {(product.version === "14" && (
            <div className="grid grid-cols-4 gap-8 mt-8">
              <button
                onClick={() => handleSelect("model", "14Base")}
                className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "14Base" &&
                  "border-none ring-4 ring-emerald-300"
                  } delay-100 rounded-2xl`}
              >
                <p className="font-bold">iPhone 14</p>
                <p className="text-xs">6.1 inch display</p>
              </button>
              <button
                onClick={() => handleSelect("model", "14Plus")}
                className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "14Plus" &&
                  "border-none ring-4 ring-emerald-300"
                  } delay-100 rounded-2xl`}
              >
                <p className="font-bold">iPhone 14 plus</p>
                <p className="text-xs">6.7 inch display</p>
              </button>
            </div>
          )) ||
            (product.version === "15" && (
              <div className="grid grid-cols-4 gap-8 mt-8">
                <button
                  onClick={() => handleSelect("model", "15Base")}
                  className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "15Base" &&
                    "border-none ring-4 ring-emerald-300"
                    } delay-100 rounded-2xl`}
                >
                  <p className="font-bold">iPhone 15</p>
                  <p className="text-xs">6.1 inch display</p>
                </button>
                <button
                  onClick={() => handleSelect("model", "15Plus")}
                  className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "15Plus" &&
                    "border-none ring-4 ring-emerald-300"
                    } delay-100 rounded-2xl`}
                >
                  <p className="font-bold">iPhone 15 plus</p>
                  <p className="text-xs">6.7 inch display</p>
                </button>
                <button
                  onClick={() => handleSelect("model", "15Pro")}
                  className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "15Pro" &&
                    "border-none ring-4 ring-emerald-300"
                    } delay-100 rounded-2xl`}
                >
                  <p className="font-bold">iPhone 15 pro</p>
                  <p className="text-xs">6.1 inch display</p>
                </button>
                <button
                  onClick={() => handleSelect("model", "15ProMax")}
                  className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.model === "15ProMax" &&
                    "border-none ring-4 ring-emerald-300"
                    } delay-100 rounded-2xl`}
                >
                  <p className="font-bold">iPhone 15 pro max</p>
                  <p className="text-xs">6.7 inch display</p>
                </button>
              </div>
            ))}
          {product.version === "14" && product.model === "14Base" || product.version === "14" && product.model === "14Plus" ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleSelect("color", "14Blue")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Blue rounded-full ${product.color === "14Blue" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "14Purple")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Purple rounded-full ${product.color === "14Purple" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "14Yellow")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Yellow rounded-full ${product.color === "14Yellow" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "14Midnight")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Midnight rounded-full ${product.color === "14Midnight" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "14Starlight")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Starlight rounded-full ${product.color === "14Starlight" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "14Red")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-14Red rounded-full ${product.color === "14Red" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
            </div>
          ) : null}
          {product.version === "15" && product.model === "15Base" || product.version === "15" && product.model === "15Plus" ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleSelect("color", "15Blue")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15Blue rounded-full ${product.color === "15Blue" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15Pink")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15Pink rounded-full ${product.color === "15Pink" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15Yellow")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15Yellow rounded-full ${product.color === "15Yellow" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15Green")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15Green rounded-full ${product.color === "15Green" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15Black")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15Black rounded-full ${product.color === "15Black" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
            </div>
          ) : null}
          {product.version === "15" && product.model === "15Pro" || product.version === "15" && product.model === "15ProMax" ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleSelect("color", "15ProNaturalTitanium")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15ProNaturalTitanium rounded-full ${product.color === "15ProNaturalTitanium" &&
                  "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15ProBlueTitanium")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15ProBlueTitanium rounded-full ${product.color === "15ProBlueTitanium" && "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15ProWhiteTitanium")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15ProWhiteTitanium rounded-full ${product.color === "15ProWhiteTitanium" &&
                  "ring-4 ring-emerald-300"
                  }`}
              ></button>
              <button
                onClick={() => handleSelect("color", "15ProBlackTitanium")}
                className={`w-10 h-10 mx-2 shadow-inner shadow-gray-500 bg-15ProBlackTitanium rounded-full ${product.color === "15ProBlackTitanium" &&
                  "ring-4 ring-emerald-300"
                  }`}
              ></button>
            </div>
          ) : null}
          {product.color ? (
            <div className="grid grid-cols-4 gap-8 mt-8">
              <button
                onClick={() => handleSelect("storage", "128GB")}
                className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.storage === "128GB" &&
                  "border-none ring-4 ring-emerald-300"
                  } delay-100 rounded-2xl`}
              >
                <p className="font-bold">128GB</p>
              </button>
              <button
                onClick={() => handleSelect("storage", "256GB")}
                className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.storage === "256GB" &&
                  "border-none ring-4 ring-emerald-300"
                  } delay-100 rounded-2xl`}
              >
                <p className="font-bold">256GB</p>
              </button>
              <button
                onClick={() => handleSelect("storage", "512GB")}
                className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.storage === "512GB" &&
                  "border-none ring-4 ring-emerald-300"
                  } delay-100 rounded-2xl`}
              >
                <p className="font-bold">512GB</p>
              </button>
              {(product.model === "15Pro" || product.model === "15ProMax") && (
                <button
                  onClick={() => handleSelect("storage", "1TB")}
                  className={`h-20 flex flex-col items-center justify-center border border-stone-400 border-dashed hover:border-solid ${product.storage === "1TB" &&
                    "border-none ring-4 ring-emerald-300"
                    } delay-100 rounded-2xl`}
                >
                  <p className="font-bold">1TB</p>
                </button>
              )}
            </div>
          )
            :
            null
          }
        </div>
      </div>
      {
        product.version && product.model && product.color && product.storage ?
          <PurchaseInfo product={product} price={price} close={setProduct} />
          :
          null
      }
    </div>
  );
};