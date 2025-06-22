import { useRef, useState, useEffect } from "react";
import "./App.css";
import Lottie from "@lottielab/lottie-player/react";

export default function FocusInputLottie() {
  const animationRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const switchState = (stateName) => {
    animationRef.current?.interactivity?.goToState(stateName, {
      duration: 0.1,
    });
  };
  const handleUserNameFocus = () => {
    switchState("Following");
  };
  const handlePasswordFocus = () => {
    switchState(showPassword ? "Peeking" : "Covering");
  };
  const handleBlur = () => {
    switchState("Blinking");
  };

  useEffect(() => {
    animationRef.current?.interactivity?.inputs.set(
      "name_length",
      Math.min(userName.length / 32, 1)
    );
  }, [userName]);

  useEffect(() => {
    switchState(showPassword ? "Peeking" : "Covering");
  }, [showPassword]);

  return (
    <div className="login-container">
      <Lottie
        src="https://cdn.lottielab.com/l/CvhgB3ExbfUqUH.json"
        ref={animationRef}
      />
      <div className="details">
        <div className="detail-label">
          <label className="detail-name">Email</label>
        </div>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={userName}
          onFocus={handleUserNameFocus}
          onBlur={handleBlur}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className="detail-label">
          <label className="detail-name">Password</label>
          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Password
          </label>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="login-input"
          value={password}
          onFocus={handlePasswordFocus}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Login</button>
      </div>
    </div>
  );
}
