import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import {
  passwordValidation,
  ageValidation,
  emailValidation,
} from "./validation";
import defaultUser from "./img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { regionsFetchData, setRegion } from "./Redux/actions/action";
import visibility from "./img/visibility.png";
import noVisibility from "./img/noVisibility.png";

function App() {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => setPasswordShown(!passwordShown);

  useEffect(() => {
    dispatch(regionsFetchData());
  }, []);

  const regions = useSelector((state) => state.formReducer.regions);
  const disabledSubmit = useSelector((state) => state.formReducer.submit);
  const currentRegion = useSelector((state) => state.formReducer.regionId);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [inputFile, setInputFile] = useState(false);

  useEffect(() => {
    if (image) {
      if (typeof image === "string") {
        setPreview(image);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const imageSet = (event) => {
    const file = event.target.files[0];
    console.log(file);
    file && file.type.substring(0, 5) === "image"
      ? setImage(file)
      : setImage(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setImage(event.target.value);
    }
  };

  const cities = useSelector((state) => state.formReducer.regionCities);

  const date = new Date().toLocaleDateString();
  // console.log(date)

  return (
    <div className="App">
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <div className="AvatarPart formPart">
          <img src={preview ? preview : defaultUser} alt="" />
          <button
            onClick={(event) => {
              event.preventDefault();
              setInputFile(!inputFile);
            }}
          >
            Change photo
          </button>
          {inputFile && (
            <div className="inputFile">
              <button
                style={{ border: "1px solid #000" }}
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                File
              </button>
              <input type="text" placeholder="Link" onKeyDown={handleKeyDown} />
            </div>
          )}
          <input
            name="avatar"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={imageSet}
          />
        </div>

        <div className="emailPart formPart">
          <label>E-mail</label>
          <input
            name="email"
            type="text"
            placeholder="e-mail"
            required
            onChange={emailValidation}
          />
        </div>

        <div className="passwordPart formPart">
          <label>Password</label>
          <div className="passInput">
            <input
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="password"
              required
              onChange={passwordValidation}
            />
            <img
              src={passwordShown ? noVisibility : visibility}
              onClick={togglePassword}
            />
          </div>
        </div>

        <div className="birthDate formPart">
          <label>Date of Birth</label>
          <input
            name="dateOfBirth"
            type="date"
            defaultValue={date}
            required
            onChange={ageValidation}
          />
        </div>

        <div className="regionPart formPart">
          <label>Region</label>
          <select name="regions"
            defaultValue="default"
            required
            onChange={(e) => {
              const region = regions.find((r) => r.id === e.target.value).areas
              dispatch(setRegion(e.target.value,region));
            }}
          >
            <option value="default" disabled>
              Choose region
            </option>
            {regions.map((region) => {
              return (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              );
            })}
          </select>
        </div>

        {currentRegion && (
          <div className="cityPart formPart">
            <label>City/Town</label>
            <select name="city" defaultValue="default" required>
              <option value="default" disabled>
                Choose city/town
              </option>
              {cities.map(city => {
                return (
                  <option key={city.id} value={city.id}>
                  {city.name}
                </option>
                )
              })
              }
            </select>
          </div>
        )}

        <button type="submit" disabled={disabledSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
