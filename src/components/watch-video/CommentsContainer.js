import React from "react";
import { PROFILE_PIC } from "../../utils/constants";

const commentsMockData = [
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        name: "Preeth Prathapan",
        image: PROFILE_PIC,
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
      },
      {
        name: "Preeth Prathapan",
        image: PROFILE_PIC,
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
          {
            name: "Preeth Prathapan",
            image: PROFILE_PIC,
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [
              {
                name: "Preeth Prathapan",
                image: PROFILE_PIC,
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [
                  {
                    name: "Preeth Prathapan",
                    image: PROFILE_PIC,
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [
                      {
                        name: "Preeth Prathapan",
                        image: PROFILE_PIC,
                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Preeth Prathapan",
                    image: PROFILE_PIC,
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Preeth Prathapan",
    image: PROFILE_PIC,
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
];

const Comment = ({ comment }) => {
  return (
    <div className="flex mt-4">
      <div className="h-10 w-10 rounded-full bg-slate-200">
        <img className="h-10 w-10 rounded-full" alt="" src={comment.image} />
      </div>
      <div className="ml-4">
        <p className="font-semibold">{comment.name}</p>
        <p className="text-xs font-normal text-gray-500">{comment.text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => {
    return (
      <div key={index}>
        <Comment comment={comment} />
        {comment.replies.length > 0 && (
          <div className="pl-7 border border-l-gray-400 ml-5 border-transparent">
            <CommentsList comments={comment.replies} />
          </div>
        )}
      </div>
    );
  });
};

const CommentsContainer = () => {
  return (
    <div className="text-lg">
      Comments
      <CommentsList comments={commentsMockData} />
    </div>
  );
};

export default CommentsContainer;
