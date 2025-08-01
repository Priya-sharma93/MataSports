import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorldMapImg from "../../../assets/Images/world_map.png";
import groupImg from "../../../assets/Images/WorldGroup.png";
import "./Worldmap.css";

const Worldmap = () => {
    return (
        <Container fluid className="worldmap-section">
            <Container className="worldmap-container">
                <Row className="align-items-center">
                    <Col xs={12} className="worldmap-image-container position-relative">
                        <Image 
                            src={WorldMapImg} 
                            alt="World Map" 
                            fluid 
                            className="worldmap-background"
                        />
                        <div className="grouped-profiles-wrapper">
                            <Image 
                                src={groupImg} 
                                alt="Grouped Profiles" 
                                fluid 
                                className="grouped-profiles"
                            />
                        </div>
                    </Col>
                    <Col 
                        xs={12} 
                        lg={5} 
                        className="worldmap-content text-center text-lg-start"
                    >
                        <div className="content-wrapper">
                            <h2 className="worldmap-title">
                                Helping Coaches <br /> around the world
                            </h2>
                            <p className="worldmap-description">
                                We work with professionals coaches and help them to build careers
                                to fulfill them professionally, intellectually, financially, and emotionally.
                            </p>
                            <Link to="/" className="text-decoration-none">
                                <Button variant="success" className="worldmap-button" style={{width:'10rem'}}>
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Worldmap;
