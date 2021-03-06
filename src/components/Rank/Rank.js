import React from "react";
import {Link} from "react-router-dom";

const Rank = ({user, score, refresh}) => {
	// displays current score and if score is updated will show new score once user finishes episode.
	return (
		<div className="user">
			<div className="user__details">
				<h2 className="user__rank fs--1">
				  Hi, <span className="user__rank--name">{user.username}</span>
				</h2>
				<p className="user__info fs--3">
				  You have a total score of <span className="user__rank--score">{!score ? user.score : score}</span> points!
				</p>
				<div className="user__info">
					<Link to="/leaderboard" onClick={refresh}>
						<span className="btn btn__ghost user__btn">View leaderboard</span>
					</Link>
					{/* <a href="#!" className="btn btn__ghost user__btn">View leaderboard</a> */}
				</div>
			</div>
		</div>
	);
}

export default Rank;