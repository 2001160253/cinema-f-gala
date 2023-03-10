import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PayBankCard.scss";

export default function PayBankCard() {
  const navigate = useNavigate();
  const [lsbank, getLsBank] = useState();
  const [lsCard, getLsCard] = useState();

  const [BankId, setBankId] = useState(0);
  const [CardNumber, setCardNumber] = useState(0);
  const [CardName, setCardName] = useState("");
  const [ExpireDate, setExpireDate] = useState(0);
  const [CVV, setCVV] = useState("");

  const [values, setValues] = useState();

  const handleOnKeyupCardNumber = (e) => {
    setCardNumber(e.target.value);
  };
  const handleOnKeyupName = (e) => {
    setCardName(e.target.value);
  };
  const handleOnKeyupExpire = (e) => {
    setExpireDate(e.target.value);
  };
  const handleOnKeyupCVV = (e) => {
    setCVV(e.target.value);
  };

  const handleChangeBankID = (e) => {
    setBankId(e.target.value);
  };

  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/Bank/Bank"
    )
      .then((res) => res.json())
      .then((data) => getLsBank(data));

    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/Bank/BankCard"
    )
      .then((res) => res.json())
      .then((data) => getLsCard(data));
  }, []);

  const showTimeFormat = JSON.parse(localStorage.getItem("showDate"));
  const dd = showTimeFormat.slice(0, 2);
  const m = showTimeFormat.substr(3, 2);
  const y = showTimeFormat.slice(6);
  const gio = JSON.parse(localStorage.getItem("showTime"));

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      BankId: JSON.parse(BankId),
      CardNumber: CardNumber,
      CardName: CardName,
      ExpireDate: ExpireDate,
      CVV: CVV,
      Price: localStorage.getItem("price"),
      ShowCode:
        JSON.parse(localStorage.getItem("theater")).id +
        JSON.parse(localStorage.getItem("movieDetail")).id,
      Email: JSON.parse(localStorage.getItem("authentication")).Email,
      CinemaName: JSON.parse(localStorage.getItem("theater")).name,
      TheaterName: JSON.parse(localStorage.getItem("theater")).name,
      FilmName: JSON.parse(localStorage.getItem("movieDetail")).name,

      ImageLandscape: JSON.parse(localStorage.getItem("movieDetail"))
        .imageLandscape,
      ImagePortrait: JSON.parse(localStorage.getItem("movieDetail"))
        .imageLandscape,
      Combo: JSON.parse(localStorage.getItem("combo")).name,
      SeatCode: JSON.parse(localStorage.getItem("seat")).name,
      ShowTime: `${y}-${m}-${dd}T${gio}Z`,
    }),
  };
  const handlePay = () => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/Ticket",
      options
    ).then((res) => {
      console.log({
        BankId: JSON.parse(BankId),
        CardNumber: CardNumber,
        CardName: CardName,
        ExpireDate: ExpireDate,
        CVV: CVV,
        Price: JSON.parse(localStorage.getItem("price")),
        ShowCode:
          JSON.parse(localStorage.getItem("theater")).id +
          JSON.parse(localStorage.getItem("movieDetail")).id,
        Email: JSON.parse(localStorage.getItem("authentication")).Email,
        CinemaName: JSON.parse(localStorage.getItem("theater")).name,
        TheaterName: JSON.parse(localStorage.getItem("theater")).name,
        FilmName: JSON.parse(localStorage.getItem("movieDetail")).name,

        ImageLandscape: JSON.parse(localStorage.getItem("movieDetail"))
          .imageLandscape,
        ImagePortrait: JSON.parse(localStorage.getItem("movieDetail"))
          .imageLandscape,
        Combo: JSON.parse(localStorage.getItem("combo")).name,
        SeatCode: JSON.parse(localStorage.getItem("seat")).name,
        ShowTime: `${y}-${m}-${dd}T${gio}Z`,
      });

      if (res.status == 200) {
        toast.success("?????t v?? th??nh c??ng!");
        setTimeout(() => {
          navigate("/myticket");
        }, 1000);
      } else {
        toast.error("Sai th??ng tin th???");
      }
    });
  };

  const localEmail = JSON.parse(localStorage.getItem("authentication"));

  return (
    <div className=" bankcard container">
      <h2 className="paymentTitle">Vui l??ng Thanh to??n</h2>

      <div className="total">
        <ToastContainer position="top-center" />

        <div className="payContainer">
          <div className="payLeft">
            <span>Email</span>
            <input type="text" disabled value={localEmail.Email} />
          </div>
          <div className="payLeft">
            <span>Ch???n ng??n h??ng</span>
            <select className="Bank form-select" onChange={handleChangeBankID}>
              {lsbank &&
                lsbank.map((bank, i) => {
                  return (
                    <option value={bank.Id}>
                      <div key={i}>
                        <div className="Logo" key={i}>
                          <img src={bank.Logo} alt={bank.Name} />
                        </div>
                        <p className="Name">{bank.Name}</p>
                      </div>
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="payLeft">
            <span>S??? th???</span>
            <input
              className="mb-20"
              placeholder="S??? Bank"
              onChange={handleOnKeyupCardNumber}
              name="numbercard"
            />
          </div>
          <div className="payLeft">
            <span>T??n ch??? th???</span>
            <input
              className="mb-20"
              placeholder="T??n ch??? th???"
              onChange={handleOnKeyupName}
              name="cardname"
            />
          </div>
          <div className="payLeft">
            <span>Ng??y h???t h???n</span>
            <input
              className="mb-20"
              placeholder="Ng??y h???t h???n"
              name="expire"
              onChange={handleOnKeyupExpire}
            />
          </div>
          <div className="payLeft">
            <span>CVV</span>
            <input
              className="mb-20"
              placeholder="CVV"
              name="CVV"
              onChange={handleOnKeyupCVV}
            />
          </div>
          <div className="btnPay payLeft">
            <span></span>
            <div className="btnW">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePay}
              >
                Thanh to??n
              </button>
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
