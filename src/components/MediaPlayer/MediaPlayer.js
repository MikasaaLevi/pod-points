import React from "react";
import {Media, Player, controls} from "react-media-player";
import styles from "./Media.module.scss";
import CustomPlayPause from './CustomPlayPause/CustomPlayPause';
import CustomProgress from './CustomProgress/CustomProgress';
// dev purposes
// import sampleAudio from "../../assets/audio/sample_audio.mp3"; used to test on local audio file
const { 
  CurrentTime, 
  Duration, 
  // Volume, uncomment for testing
  // SeekBar uncomment for testing
} = controls;

const MediaPlayer = ({currentEpisode, onUpdateScore, id}) => {
  
  let [episode] = currentEpisode; // currentEpisode[0].props
  return (
    // The player component when the episode ends will dispatch updating the score using user id and display popup
    <Media>
      <div className="media">
        <div className="media-player">
            {<Player onEnded={()=> onUpdateScore(id)} src={episode.src} />}
        </div>
        <div className="media-details">
          <div className="media-img">
              <img src={episode.image ? episode.image : ""} height="12rem" width="12rem" alt={episode.title ? episode.title : "episode thumbnail"} />
          </div>
          <p className="media-details-name">
              {episode.title.length > 40 ? episode.title.substr(0, 40) + "..." : episode.title}
          </p>
        </div>
        <div className="media-controls">
          <CustomProgress className={styles.media_duration_bar}/>
          <CurrentTime className={`fs--4 ${styles.media_time} ${styles.media_time__current}`}/>
          <CustomPlayPause styles={styles}/>
          {/* <Volume /> for debugging purposes for muting during test of popup modal */}
          {/* <SeekBar className={styles.temp} for skipping near end to test popup modal /> */}
            {episode.src === 0 ? <p>could not play</p> : null }
          <Duration className={`fs--4 ${styles.media_time} ${styles.media_time__duration}`}/>
        </div>
      </div>
    </Media>
  )
}

export default MediaPlayer;

