import { GoogleGenAI, Type } from "@google/genai";
import { Homework, QuestionFeedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeHomeworkImage(base64Image: string, mimeType: string): Promise<Partial<Homework>> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    你是一位专业的中文老师。请分析这张作业图片。
    
    **极其重要：你必须全程使用简体中文进行回答。严禁出现任何英文单词（除非是题目本身包含的英文，如数学公式中的变量 x, y 或英语作业中的单词）。**
    
    要求：
    1. 识别所有题目和学生的回答。
    2. 对于每一道题：
       - 提供原始题目文本（中文）。
       - 提供学生的回答（中文）。
       - 提供正确答案和完整的中文解析（详细步骤）。
       - 判断学生的回答是否正确。
       - 给出得分（满分 10 分）。
       - 为学生提供鼓励性的中文反馈。
       - 如果回答错误，提供“AI 提示”以帮助改进（中文）。
    3. 计算总分。
    4. 为学生提供整体的中文 AI 建议，指出优缺点。
    5. 识别相关主题的掌握程度（例如：代数、几何、函数等，使用中文名称）。
    6. 推荐 2 个学习资源（中文标题和类型）。
    
    **最终检查：确保 JSON 中的所有 string 字段内容均为中文。**
    
    请按 JSON 格式返回数据，匹配 Homework 接口。
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType
            }
          }
        ]
      }
    ],
    config: {
      systemInstruction: "你是一个专业的作业批改助手，始终使用中文回答。你的任务是准确识别题目、学生答案，并提供详尽的中文解析和反馈。",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subject: { type: Type.STRING },
          score: { type: Type.NUMBER },
          totalScore: { type: Type.NUMBER },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER },
                title: { type: Type.STRING, description: "The question text" },
                score: { type: Type.NUMBER },
                maxScore: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                aiTip: { type: Type.STRING },
                isCorrect: { type: Type.BOOLEAN },
                correctAnswer: { type: Type.STRING, description: "The correct answer and full explanation" }
              },
              required: ["id", "title", "score", "maxScore", "feedback", "isCorrect", "correctAnswer"]
            }
          },
          mastery: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.NUMBER }
              }
            }
          },
          aiSuggestion: { type: Type.STRING },
          learningResources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                type: { type: Type.STRING, description: "video or exercise" },
                link: { type: Type.STRING }
              }
            }
          }
        },
        required: ["title", "subject", "score", "totalScore", "questions", "mastery", "aiSuggestion", "learningResources"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || "{}");
    return {
      ...result,
      status: 'graded',
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("AI 识别失败，请重试");
  }
}
