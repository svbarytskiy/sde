// Розробити схему алгоритму, програму визначення кількості слів у тексті, що
// вводиться з клавіатури і тести, що підтверджують правильність роботи програми.

#include <iostream>
#include <string>

using namespace std;

int countWords(string text) {
    int count = 0;
    for (int i = 0; i < text.length(); i++) {
        if (text[i] != ' ') 
        {
            count++;
            cout << count <<endl;
            if(text[i+1] != ' ' && text[i+1]!=text[text.length()]){
                count--;
            }
        }
    }
    return count;
}

int main() {
    string text;
    cout << "Enter text:";
    getline(cin, text);
    int words = countWords(text);
    cout << "Number of words: " << words << endl;
    return 0;
}