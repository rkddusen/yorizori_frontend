import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const RestaurantPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const [dishName, setDishName] = useState(new URLSearchParams(location.search).get("dish"))
  const [map, setMap] = useState(null);
  const [geoLocation, setGeoLocation] = useState(location.state);
  const [restaurant, setRestaurant] = useState([]);
  const [markers, setMarkers] = useState(null);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const viewRestaurant = async () => {
    const res = await axios.post(`${axiosUrl}/recipe/map/get/api`,{latitude: geoLocation.latitude, longitude: geoLocation.longitude, foodName: dishName});
      try {
        setRestaurant(res.data);
      } catch {
        console.log("오류");
      }
  }

  useEffect(() => {
    if(geoLocation && dishName !== null){
      console.log(dishName);
      if(dishName) viewRestaurant();
      else setRestaurant([]);
      const mapDiv = document.getElementById("map");
      const mapOptions = {
        center: new window.naver.maps.LatLng(geoLocation.latitude, geoLocation.longitude),
        zoomControl: false,
        zoom: 13,
      }
      const _map = new window.naver.maps.Map(mapDiv, mapOptions);
      
      setMap(_map);
    }
  }, [location, geoLocation]);

  useEffect(() => {
    let _markers = [];
    if(map && restaurant.length > 0){
      restaurant.forEach((v, i) => {
        _markers.push(addMarker(v, i));
      });
    }
    setMarkers(_markers)
  },[restaurant]);

  const addMarker = (info, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(info.mapy, info.mapx),
        map: map, // 위에서 초기화한 맵에 마커 추가
      });
      const infowindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px;border-radius:10px"><a href=${info.link} target='_blank'>${info.title}</a></div>`
      });
      window.naver.maps.Event.addListener(marker, "click", ()=>handleMarkerClick(marker, infowindow));

      return marker;
  };

  const handleMarkerClick = function (marker, infowindow) {
    console.log(marker);
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  };

  const openMarker = (info, index) => {
    const infowindow = new window.naver.maps.InfoWindow({
      content: `<div style="padding:10px;border-radius:10px"><a href=${info.link} target='_blank'>${info.title}</a></div>`
    });
    handleMarkerClick(markers[index], infowindow)
  }
  
  const handleSearchChange = () => {
    setDishName(searchRef.current.value);
  }

  const handleEnterKey = (event) => {
    if(event.key === 'Enter'){
      search();
    }
  }
  const search = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('dish', dishName);

    navigate(`/restaurant?dish=${dishName}`,{replace: true});
  }

  return (
    <div>
      <Wrap>
        <Header />
        <StyledBody>
          <Contents>
            <SearchBox>
              <SearchInput type="text" placeholder="찾고 싶은 메뉴를 검색하세요." value={dishName || ''} ref={searchRef} onChange={handleSearchChange} onKeyDown={handleEnterKey} />
              <SearchSvg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" onClick={search}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </SearchSvg>
            </SearchBox>
            <RestaurantArea>
              <Map id="map"></Map>
              <RestaurantList>
                { restaurant.length > 0 ? (
                  <>
                    {
                      restaurant.map((v,i) => 
                        <RestaurantItem key={i} onClick={() => openMarker(v, i)}>
                          <RestaurantItemTitle>
                            <p>{v.title}</p>
                            <p>{v.category}</p>
                          </RestaurantItemTitle>
                          <p>
                            {v.roadAddress}
                          </p>
                        </RestaurantItem>
                      )
                    }
                  </>
                ) : (
                  <>검색된 식당이 없습니다.</>
                )
                }
              </RestaurantList>
            </RestaurantArea>
          </Contents>
        </StyledBody>
      </Wrap>
      <Footer />
    </div>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 250px - 170px);
`;
const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 190px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 80px;
  }
`;
const SearchBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 10px 0;
  border: 2px solid #FFA800;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    width: 90vw;
    margin-top: 10px;
    padding: 5px 0;
  }
`;
const SearchInput = styled.input`
  border: none;
  padding: 0;
  width: 100%;
  margin-left: 5px;
  font-size: 18px;
  line-height: normal;
  &:focus {
    outline: none;
  }
  &::placeholder{
    color: #cccccc;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
const SearchSvg = styled.svg`
  margin: 0 10px;
  &:hover {
    cursor: pointer;
    stroke: #FFA800;
  }
`;
const RestaurantArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 50px 0;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    margin: 10px 0;
  }
`;
const Map = styled.div`
  width: 49%;
  height: 500px;
  border-radius: 5px;
  & a{
    color: black;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 300px;
  }
`;
const RestaurantList = styled.div`
  width: 49%;
  height: auto;
  margin-left: 20px;
  text-align: center;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
  }
`;
const RestaurantItem = styled.div`
  margin: 20px 0;
  padding: 15px;
  /* border: 2px solid #FFA80050; */
  box-shadow: 0px 2px 5px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  text-align: start;
  &:first-child{
    margin-top: 10px;
  }
  &:last-child{
    margin-bottom: 10px;
  }
  &>p{
    font-size: 14px;
  }

  &:hover{
    background-color: #fafafa;
    cursor: pointer;
  }
`;
const RestaurantItemTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  margin-bottom: 20px;
  & > p:first-child{
    font-size: 18px;
    color: #FFA800;
  }
  & > p:last-child{
    font-size: 14px;
    color: #aaaaaa;
    margin-left: 10px;
  }
`;

export default RestaurantPage;