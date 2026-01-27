# Incomplete

board = [["-", "-", "-"],
         ["-", "-", "-"],
         ["-", "-", "-"]]
player_turn = True
is_game_over = False


def main() -> None:
    if player_turn:
        choose_turn()
    else:
        opponent_turn()


def choose_turn() -> None:
    print_board()


def print_board() -> None:
    for row in board:
        print(row)


def is_terminal() -> bool:
    pass


def utility() -> bool:
    pass


def opponent_turn() -> None:
    pass


if __name__ == "__main__":
    main()
