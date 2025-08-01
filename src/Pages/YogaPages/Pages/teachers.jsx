import Footer from "../Components/footer";
import ladiesLogo from "../assets/Images/ladiesImage.jpg";
import backgroundLogo from "../assets/Images/backgroundLogo.png";
import { useState } from "react";
import { teachersData } from "../Components/teachersDataArray";
import "../index.css";
import YogaHeader from "../Components/header";

const Teachers = () => {
  const [searchImg, setSearchImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalTeachers = 8;

  const onSearchHandle = (e) => {
    setSearchImg(e.target.value);
  };

  const filteredTeachers = teachersData.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchImg.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeachers.length / totalTeachers);

  const index = (currentPage - 1) * totalTeachers;

  const teacherProfile = filteredTeachers.slice(index, index + totalTeachers);

  const onHandlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const onHandleNext = () => {
    setCurrentPage((prev) => {
      const nextPage = prev + 1;
      if (nextPage <= totalPages) {
        return nextPage;
      }
      return prev;
    });
  };

  return (
    <div>
      <YogaHeader />
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{
          minHeight: "50vh",
          backgroundColor: "#d9ebe8",
          padding: "6rem",
        }}
      >
        {/* Background Logo */}
        <div className="">
          <img
            src={backgroundLogo}
            alt="background logo"
            style={{ position: "absolute", bottom: "0", right: "0" }}
          />
        </div>

        <div
          className="col-22 col-lg-6 text-lg-start position-relative"
          style={{ zIndex: "1", width: "80%" }}
        >
          <h1
            className="fw-bold color-darkblue font-family-sofia-pro"
            style={{
              fontSize: "45px",
              marginTop: "50px",
            }}
          >
            Our teachers
          </h1>
          <p className="opacity-75 custom-paragraph-text">
            Esther Ekhart and our community of teachers <br /> bring years of
            expertise to share with you. <br /> They love to connect with you
            and personally <br />
            reply to your questions and comments on their <br /> classes. Visit
            our Workshops page to see their <br /> retreats, workshops and
            teacher training <br />
            courses.
          </p>
          <div className="d-flex gap-5 mt-5 flex-column flex-md-row text-lg-start">
            <button
              className="px-4 py-2 border-0 text-white rounded-pill fs-4 fw-bold btn-red"
              style={{
                height: "auto",
                width: "auto",
              }}
            >
              Try 14 days for free
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <div>
          <input
            type="text"
            placeholder="Search here"
            value={searchImg}
            onChange={onSearchHandle}
            className="fs-3 px-5 mt-3"
            style={{
              position: "relative",
              left: "75%",
              padding: "10px",
              border: "2px solid green",
              borderRadius: "30px",
            }}
          />
        </div>
        <div className="container my-5">
          <div className="row">
            {teacherProfile.map((profile, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-3 text-center"
                style={{ marginBottom: "7rem" }}
              >
                <img
                  src={profile.img}
                  alt={profile.name}
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <h6 className=" teachers-name-color">{profile.name}</h6>
                <p className="color-muted-gray font-italic">{profile.skills}</p>
                <button
                  className="rounded-pill bg-white"
                  style={{ color: "#38bba0", border: "1.9px solid #38bba0" }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}

        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
          <button
            onClick={onHandlePrev}
            className="text-white rounded-pill p-2 next-btn-color border-0"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onHandleNext}
            className="text-white rounded-pill p-2 next-btn-color border-0"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Teachers;
