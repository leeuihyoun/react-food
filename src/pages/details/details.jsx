import { useParams } from 'react-router-dom';
import './details.css';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/context';


export default function Details(){
	const{id} = useParams();
	//Context에서 사용할 state들을 바아온다
	//상세보기에서 foodDetailData에 데이터를 받아오고
	// 상세보기에서 즐겨찾기에 추가하게 한다.
	const{foodDetailData,setFoodDetailData,favoritesList,hAddToFavorite}= useContext(GlobalContext);
	// 오래걸리는 작업은 use Effect로 별도 처리
	useEffect(()=>{
		// 상세보기 화면에 들어오면 id를 기준으로 데이터를 요청한다
		async function getFoodDetail(){
			// 음식 레시피상세정보 받아오기
			// async 비동기를 썻으니까 await으로 완료될때까지 대기시키기가 가능
			const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

			const data = await res.json();
			console.log(data);
			// 잘 들어왓으면 foodDetailData 에 담자 (setFoodDetailData를 통해)
			if(data?.data){
				setFoodDetailData(data?.data);
			}
		}
		
		getFoodDetail();
	},[])
	return(
		<div className='details_container'>
			
			{/* 이미지 */}
			<div className='img-container'>

				<div className='img-wrapper'>
					<img src={foodDetailData?.recipe?.image_url} className='img-style'alt='...'/>
				</div>
			</div>
			{/* 글 */}
			<div className='content-container'>
				<span className='text-publisher'>
					{foodDetailData?.recipe?.publisher}
				</span>
				<h3 className='text-title'>{foodDetailData?.recipe?.title}</h3>

				{/* 즐겨찾기 추가 버튼 */}
					<div>
						<button className='favorites-btn' onClick={()=>{
							hAddToFavorite( foodDetailData?.recipe)
						}}>
						{
						favoritesList && favoritesList.length > 0 && favoritesList.findIndex(item=>item.id === foodDetailData.recipe?.id) !== -1 ? '즐겨찾기에 추가' : '즐겨찾기에서 제거'
						}	
						</button>

					</div>
					
				{/* 레시피 내용 */}
				<div>
						<span className='recipe-title'>레시피 : </span>
						<ul>
							{
								//map을 통해서 들어있는 만큼만 반복하며 li태그 생성
								foodDetailData?.recipe.ingredients.map((ingredient,idx)=>{
									return(
										<li key={idx} style={recipe-container}>
											<span>
												{ingredient.quantity} {ingredient.unit}
											</span>
											<span>
												{ingredient.description} 
											</span>
										</li>
									)
								})
							}
						</ul>
				</div>
			</div>
		</div>
	)
}