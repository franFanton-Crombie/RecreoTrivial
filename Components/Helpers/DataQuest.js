export const funcionRara = (array: any) => 
[...array].sort(() => Math.random() - 0.7);

export const QuestionDifficulty = {
    EASY : 'easy',
    MEDIUM : 'medium',
    HARD : 'hard',
}

export type QuizProps = {
    category : string,
    correct_answer : string,
    difficulty : String,
    incorrect_answer : string[],
    question : string ,
    type : string
};

export type QuizPropsState = QuizProps & {answers: string[]}

export const grabQuizQuestions = async(
    totalQuestions: number,
    difficulty: QuestionDifficulty
    ) : Promise<QuizPropsState> => {
    const endpoint =`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}&type=multiple`
    const data = await(await fetch(endpoint)).json();

    return data.results.map((quizprops: QuizProps) => ({
        ...quizprops,
    }));  
};