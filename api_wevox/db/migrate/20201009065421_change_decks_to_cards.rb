class ChangeDecksToCards < ActiveRecord::Migration[5.2]
  def change
    rename_table :decks, :cards
  end
end
