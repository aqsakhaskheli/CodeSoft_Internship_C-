#include <iostream>
#include <vector>
#include <string>

using namespace std;

void display_board(const vector<vector<char>>& board) {
    for (const auto& row : board) {
        for (char cell : row) {
            cout << cell << " | ";
        }
        cout << endl;
        cout << "---------" << endl;
    }
}

bool check_win(const vector<vector<char>>& board, char player) {
    // Check rows and columns
    for (int i = 0; i < 3; ++i) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) return true;
        if (board[0][i] == player && board[1][i] == player && board[2][i] == player) return true;
    }
    // Check diagonals
    if ((board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
        (board[0][2] == player && board[1][1] == player && board[2][0] == player)) {
        return true;
    }
    return false;
}

bool check_draw(const vector<vector<char>>& board) {
    for (const auto& row : board) {
        for (char cell : row) {
            if (cell == ' ') return false;
        }
    }
    return true;
}

void play_tic_tac_toe() {
    vector<vector<char>> board(3, vector<char>(3, ' '));
    char current_player = 'X';

    while (true) {
        display_board(board);
        int row, col;
        cout << "Player " << current_player << ", enter row (0-2): ";
        cin >> row;
        cout << "Player " << current_player << ", enter column (0-2): ";
        cin >> col;

        if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] != ' ') {
            cout << "Invalid move. Try again." << endl;
            continue;
        }

        board[row][col] = current_player;

        if (check_win(board, current_player)) {
            display_board(board);
            cout << "Player " << current_player << " wins!" << endl;
            break;
        }

        if (check_draw(board)) {
            display_board(board);
            cout << "It's a draw!" << endl;
            break;
        }

        current_player = (current_player == 'X') ? 'O' : 'X';
    }

    char play_again;
    cout << "Do you want to play again? (yes/no): ";
    cin >> play_again;
    if (play_again == 'y' || play_again == 'Y') {
        play_tic_tac_toe();
    }
}

int main() {
    play_tic_tac_toe();
    return 0;
}
