import openai
import re

# Set up OpenAI API key
openai.api_key = "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"

# Define function to evaluate IELTS writing task
def evaluate_writing_task(prompt):
    # Set up OpenAI GPT-3 engine and parameters
    engine = "text-davinci-003"
    max_tokens = 1000
    temperature = 0.3
    n = 1
    
    # Generate text from prompt using GPT-3
    response = openai.Completion.create(
        engine=engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        n=n,
        stop=None
    )

    #print (response.choices[0].text)

    # Extract score from generated text
    score_regex = r"([0-9])"
    match = re.search(score_regex, response.choices[0].text)
    
    # Return score in IELTS format
    if match:
        score = float(match.group(1))
        if score < 4.0:
            return "3.5"
        elif score < 5.0:
            return "4.0"
        elif score < 5.5:
            return "4.5"
        elif score < 6.0:
            return "5.0"
        elif score < 6.5:
            return "5.5"
        elif score < 7.0:
            return "6.0"
        elif score < 7.5:
            return "6.5"
        elif score < 8.0:
            return "7.0"
        elif score < 8.5:
            return "7.5"
        else:
            return "8.0 or higher"
    else:
        return "Score not found in generated text"

def evaluate_writing_task_summary(prompt):
    # Set up OpenAI GPT-3 engine and parameters
    engine = "text-davinci-002"
    max_tokens = 1000
    temperature = 0.2
    n = 1
    
    # Generate text from prompt using GPT-3
    response = openai.Completion.create(
        engine=engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        n=n,
        stop=None
    )

    return (response.choices[0].text)    


#prompt = "Write an essay of at least 250 words on the following topic: \n\nSome people think that social media has had a positive impact on society. Others believe that social media has had a negative impact on society. Discuss both sides and give your opinion.\n\n"
#prompt = "How many sides are there in a square?"
essay="There is no doubt that social media has had a profound impact on our society. It has changed the way we communicate, the way we interact, and the way we consume information. It has also had an impact on the way we form and maintain relationships. While there are some positive aspects to this, there are also some negative aspects. On the positive side, social media has made it easier for us to connect with people all over the world. We can communicate with anyone, at any time, and from anywhere. We can also access a wealth of information that we would never have had access to before. We can connect with like-minded people and form relationships that we would never have otherwise. On the negative side, social media can be a distraction from the real world. It can be addictive, and it can lead to isolation and loneliness. It can also be a breeding ground for negativity, and it can be used to spread misinformation. In my opinion, the positive aspects of social media outweigh the negative. While there are some risks associated with social media use, I believe that the benefits far outweigh the risks."
essay = "Reading is one of the most valuable and enjoyable activities one can engage in. Not only does reading allow us to escape reality and explore new worlds, but it also has numerous benefits for our mental and emotional well-being. Firstly, reading improves our cognitive abilities such as concentration, memory, and critical thinking skills. It also expands our vocabulary and enhances our ability to communicate effectively. Moreover, reading has been shown to reduce stress levels and improve overall mental health. It allows us to take a break from our daily stressors and enter into a different world. Additionally, reading can improve empathy and emotional intelligence. It exposes us to different perspectives and experiences, and allows us to understand and relate to others on a deeper level. Overall, the benefits of reading are numerous and far-reaching. Whether you enjoy fiction or non-fiction, reading is an excellent way to enhance your life and expand your horizons."

prompt= "Evaluate the following essay basis IELTS, and give an IELTS score :" + essay
score = "IELTS: "+ evaluate_writing_task(prompt)
print(score)

prompt= "Evaluate the following essay basis IELTS, and give numeric score for ideas"+essay
score = "Ideas: "+evaluate_writing_task(prompt)+"/10"
print("\n"+score)

prompt= "Evaluate the following essay and give a positive and a negative feedback to author for ideas"+essay
summary=evaluate_writing_task_summary(prompt)
print (summary.strip())

prompt= "Evaluate the following essay basis IELTS, and give numeric score for Coherence & Cohesion"+essay
score = "Coherence & Cohesion: "+evaluate_writing_task(prompt)+"/10"
print("\n"+score)
prompt= "Evaluate the following essay and give a 20 words feedback to author for improving Coherence & Cohesion"+essay
summary=evaluate_writing_task_summary(prompt)
print (summary.strip())


prompt= "Evaluate the following essay basis IELTS, and give numeric score for Grammatical Range & Accuracy"+essay
score = "Grammatical Range & Accuracy: "+evaluate_writing_task(prompt)+"/10"
print("\n"+score)
prompt= "Evaluate the following essay and give a 20 words feedback to author for improving Grammar"+essay
summary=evaluate_writing_task_summary(prompt)
print (summary.strip())

prompt= "Evaluate the following essay basis IELTS, and give numeric score for Lexical Resource:"+essay
score = "Lexical Resource:: "+evaluate_writing_task(prompt)+"/10"
print("\n"+score)
prompt= "Evaluate the following essay and give a 20 words feedback to author for improving Lexical Resource:"+essay
summary=evaluate_writing_task_summary(prompt)
print (summary.strip()+"\n")

prompt= "rewrite the essay to make it more clear:"+essay
summary=evaluate_writing_task_summary(prompt)
print (summary.strip()+"\n")
