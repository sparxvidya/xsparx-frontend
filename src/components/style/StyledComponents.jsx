import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent} from "react-router-dom";
import { gray, matBlack } from "../../constants/color";

 const VisuallyHiddenInput = styled("input")({

  position: "absolute",
  width: "1",
  height: "1",
  margin: "-1",
  padding: "0",
  whiteSpace: "nowrap",
  overflowWrap: "hidden",
  clip: "rect(0, 0, 0, 0)",
  
  
});
 const Link = styled(LinkComponent)`
text-decoration:none;
 color: rgb(60,60,60); 
 padding:1rem;
 &:hover {
  background-color:rgb(90,90,90);
}
`;
 const InputBox = styled("input")`
width: "100%",
height: "100%",
 padding: "0.5rem",
 outline: "none",
 border-radius: "1.5px",
 border: "none",
 background-color: ${gray};
 
`;
 const SearchField = styled("input")`
padding: 1rem 2rem;
 border-radius: 2rem;
 background-color: ${gray};
 border: none;
 width: 20vmax;
 font-size:1.1rem;

`;
const CurveButton = styled("button")`
padding: 1rem 2rem;
 border-radius: 2rem;
 background-color:${matBlack};
 border: none;
 outline: none;
 font-size:1.1rem;
 color:white;
 cursor:pointer;
 &:hover{
  background-color:rgba(0,0,0,0.8);
  }

`

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export { VisuallyHiddenInput, Link, InputBox, SearchField, CurveButton, BouncingSkeleton };