import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import TableComponent from "../components/Table";
import { DownloadIcon, DropdownIcon, ReloadIcon, SearchIcon } from "../assets";
import { useEffect, useState } from "react";
import exportToExcel from "../utils/exportToExcel";
import { deleteCar, getCarData, getTableHeaders } from "../services/requests";
function Car() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [headers, setHeaders] = useState([]);
  function getTableData() {
    Promise.all([getTableHeaders(), getCarData()])
      .then(([headersRes, dataRes]) => {
        if (headersRes.data.success) {
          const headers = headersRes.data.dataSource;
          setHeaders(headers);
        }

        if (dataRes.data.success) {
          setData(dataRes.data.dataSource.responseList);
          setFilteredData(dataRes.data.dataSource.responseList);
        }
      })
      .catch((error) => console.error("Error", error));
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const handleSearch = debounce(function (name) {
    setFilteredData(
      data.filter((car) =>
        car.carModal?.toLowerCase().includes(name?.toLowerCase())
      )
    );
  }, 500);
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <div className="w-full">
      <span className="bg-white flex flex-col mb-4 rounded-lg">
        <small className="flex w-full items-center justify-between  p-2">
          <h4>차량</h4>
          <ul className="flex items-center gap-x-2">
            <li className="bg-lightGray border border-gray  px-2 rounded-md cursor-pointer">
              조회 alt+f
            </li>
            <li className="bg-lightGray border border-gray px-2 rounded-md cursor-pointer">
              초기화 alt+r
            </li>
            <li className="bg-lightGray border border-gray  px-2 rounded-md cursor-pointer">
              더보기 alt+e
            </li>
            <li
              onClick={() => setSearch((prev) => !prev)}
              className={`${
                search ? "bg-green text-white" : "bg-lightGray"
              } flex border border-gray  px-2 rounded-md cursor-pointer`}
            >
              <img src={SearchIcon} alt="search" className="" />
              조회
            </li>
            <li className="bg-lightGray flex items-center gap-x-1 border border-gray  px-2 rounded-md cursor-pointer">
              <img src={ReloadIcon} alt="reload" className="w-3 h-3" />
              초기화
            </li>
            <li className="bg-lightGray flex items-center gap-x-1 border border-gray  px-2 rounded-md cursor-pointer">
              <img src={DropdownIcon} alt="dropdown" className="w-4 h-4" />
              더보기
            </li>
          </ul>
        </small>
        <hr className="text-lightGray" />
        <small className={`${search ? "flex" : "hidden"} px-2 pt-2 pb-4`}>
          <label>
            <h4>기타</h4>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[300px]"
            />
          </label>
        </small>
      </span>
      <span className="bg-white w-full flex flex-col px-2">
        <small className="flex justify-between mt-2 mb-4">
          <p className="text-[17px]">{`{ Total: ${filteredData.length} }`}</p>
          <small className="flex flex-col gap-y-1">
            <Button className="h-6" type="primary">
              <Link to={"/car/add"}>+ 추가 </Link>
            </Button>
            <Button
              onClick={() => exportToExcel(filteredData, "car.xlsx")}
              className="h-6"
              type=""
            >
              <img src={DownloadIcon} alt="download" className="w-3 h-3" />
              엑셀 다운로드
            </Button>
          </small>
        </small>
        <TableComponent
          headers={headers}
          data={filteredData}
          deleteFn={deleteCar}
        />
      </span>
    </div>
  );
}

export default Car;
