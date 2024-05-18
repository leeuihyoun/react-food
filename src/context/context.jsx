
import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

	//리덕스 대신에 전역적으로 사용할 state
export default function GlobalState({children}){
 let [searchParam, setSearchParam] = useState("");
 	// 음식리스트 state
 let [foodList, setFoodList] = useState([]);
	//음식 상세 데이터 state
 let [foodDetailData, setFoodDetailData] = useState(null);
 	// 즐겨찾기 등록 리스트 state
 let [favoritesList, setFavoritesList] = useState([]);
	// 제공할 함수
	// 검색을 하면 검색명으로 get요청
	async function hSubmit(event){
		event.preventDefault();// 부모까지 이벤트가 버블링 되는 것을 막는다.(전달되는것 막음)
		//https://forkify-api.herokuapp.com/v2

		//https://forkify-api.herokuapp.com/api/v2/recipes?search=${재료명}
		try{
			const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
			const information = await res.json(); //REST API는 JSON문자열로 전달하니깐 사용할 수 있는 자료형으로 변경
			console.log(information);
			if(information?.data.recipes){
				setFoodList(information?.data.recipes);
				setSearchParam('');
			}
		}catch(e){
			console.log(e);
		}
		
	}
	//즐겨찾기 등록 리스트 state의 배열을 수정(추가/삭제)
	// state의 배열은 직접 수정x==?> ...으로 분리하고 []로 감싸서 카피본으로 수정
	// 변수를 안쓰고 useState를 사용하는 이유가 데이턱값이 바뀌면 화면도 같이 갱신해주려고
	function hAddToFavorite(getCurItem)
	{
		let copyFavoritesList = [...favoritesList];// 배열 통째로 분해했다가 다시 배열로 만들어서 대입
		//동일한 ID가 있는지 검사 (getCurItem의 ID와 favoritesList의 ID들을 비교)
		const index= copyFavoritesList.findIndex(e=> e.id === getCurItem.id);
		
		if(index === -1){
			copyFavoritesList.push(getCurItem);
		}else{
			copyFavoritesList.splice(index);
		}
		// 새로 만든 배열을 state에 엎어친다
		setFavoritesList(copyFavoritesList);
		
	}
	return(
		<GlobalContext.Provider value={{searchParam,setSearchParam,hSubmit,foodList,setFoodList,foodDetailData,setFoodDetailData,favoritesList,setFavoritesList,hAddToFavorite}}>
			{children}
		</GlobalContext.Provider>
	)
}