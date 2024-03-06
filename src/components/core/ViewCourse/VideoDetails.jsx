import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '~video-react/dist/video-react.css';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

  // state variable for video Data
  const [ videoData, setVideoData ] = useState([]);

  // state variable for video ended
  const [ videoEnded, setVideoEnded ] = useState(false);

  // state variable for loading
  const [ loading, setLoading ] = useState(false);

  // it will run on first render

  const setVideoSpecificDetails = async () => {

    // if data is not present
    if( !courseSectionData.length ){
      return;
    }

    // if any id is absent
    if( !courseId && !sectionId && !subSectionId ){
      navigate("/dashboard/enrolled-courses");
    }
    else{
      // all id is present and finding video data
      const filteredData = courseSectionData.filter(
        (section) => section?._id === sectionId
      )

      const filteredVideoData = filteredData[0]?.subSection?.filter(
        (subSection) => subSection?._id === subSectionId
      )

      setVideoData(filteredVideoData[0]);
      setVideoEnded(false);
    }
  }

  useEffect(() => {
    setVideoSpecificDetails();
  },[ courseSectionData, courseEntireData, location.pathname ])

  // is first video
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section?._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )
    if( currentSectionIndex === 0 && currentSubSectionIndex === 0 ){
      return true;
    }
    else{
      return false;
    }
  }

  // is last video
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section?._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )

    if( currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1 ){
      return true;
    }
    else{
      return false;
    }
  }

  // next video
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex( (section) => section._id === sectionId );

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex( (subSection) => subSection._id === subSectionId );

    // if this is not the last video of section
    if( currentSubSectionIndex !== courseSectionData[currentSectionIndex]?.subSection.length - 1 ){
      // so we are changing video here
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id;

      // here going to next video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      // here we are reached to the last video of section and now on click next it will take to the 1st video of next section

      const nextSectionId =  courseSectionData[ currentSectionIndex + 1 ]?._id;

      const firstSubSectionId = courseSectionData[ currentSectionIndex + 1 ]?.subSection[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`);
    }
  }

  // privious video
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section?._id === sectionId );

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subSection) => subSection?._id === subSectionId );

    // go to privious video if it is not the first video of the section
    if( currentSubSectionIndex !== 0 ){

      const priviousSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]._id;

      // here we are going to privious index
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${priviousSubSectionId}`)
    }
    else{
      // here we are on the first video and going to last video of privious section
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;

      // size of subsection array
      const length = courseSectionData[currentSectionIndex - 1]?.subSection.length;

      const lastSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[length - 1]?._id;

      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${lastSubSectionId}`);
    }
  }

  // lecture completed
  const handleLectureCompletion = async () => {
    setLoading(true);

    const result = await markLectureAsComplete( { courseId, subSectionId } , token );

    if(result){
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  }

  return (
    <div>
        {
          videoData ? (<div>No Data Found</div>) : 
          (
            <Player
              ref = {playerRef}
              aspectRatio="16:9"
              playsInLine
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >

            </Player>
          )
        }
    </div>
  )
}

export default VideoDetails;