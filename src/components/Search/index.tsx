import "react-cmdk/dist/cmdk.css";
import CommandPalette, {
  filterItems,
  getItemIndex,
  JsonStructureItem,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import {
  CustomIconButton,
  CustomIconButtonPropsType,
} from "src/components/common/CustomIconButton";
import { useRecoilState } from "recoil";
import { isOpenState, searchState } from "src/components/store/Search/Search";
import { HiOutlineSearch } from "react-icons/hi";

// コマンドパレット付き検索フォームボタンコンポーネント
export const Search = () => {
  // コマンドパレットのページ名
  const page = "root";
  // コマンドパレットを表示させるフラグ
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  // 検索ワード
  const [search, setSearch] = useRecoilState(searchState);

  // Command(Ctrl)+Kでコマンドパレットをオープンできる設定
  useHandleOpenCommandPalette(setIsOpen);

  // 検索フィルター
  const filteredItems: {
    items: JsonStructureItem[];
    heading?: string | undefined;
    id: string;
  }[] = filterItems(
    [
      {
        heading: "ページ",
        id: "page",
        items: [
          {
            id: "home",
            children: "ホーム",
            icon: "HomeIcon",
            href: "/",
          },
          {
            id: "questionList",
            children: "質問",
            icon: "CollectionIcon",
            href: "/",
          },
          {
            id: "about",
            children: "アバウト",
            icon: "InformationCircleIcon",
            href: "/",
          },
          {
            id: "privacy-policy",
            children: "プライバシーポリシー",
            icon: "SupportIcon",
            href: "/",
          },
          {
            id: "inquiry",
            children: "お問い合わせ",
            icon: "MailIcon",
            href: "/",
          },
        ],
      },
      {
        heading: "その他",
        id: "other",
        items: [
          {
            id: "settings",
            children: "設定",
            icon: "CogIcon",
            href: "/",
          },
          {
            id: "trash",
            children: "ゴミ箱",
            icon: "TrashIcon",
            href: "/",
          },
          {
            id: "mypage",
            children: "マイページ",
            icon: "UserIcon",
            href: "/",
          },
          {
            id: "help",
            children: "ヘルプ",
            icon: "QuestionMarkCircleIcon",
            href: "/",
          },
          {
            id: "log-out",
            children: "ログアウト",
            icon: "LogoutIcon",
            onClick: () => {
              alert("Logging out...");
            },
          },
        ],
      },
    ],
    search
  );

  // コマンドパレットを表示させる
  const handleClick = () => setIsOpen(true);
  // ChakraUIのSearch2Icon
  const search2IconElement: JSX.Element = (
    <HiOutlineSearch color='Black' size='48px' />
  );
  // CustomIconButtonに渡す検索ボタンの情報
  const searchButtonProps: CustomIconButtonPropsType = {
    btnTestId: "btn-search",
    handleClick,
    iconElement: search2IconElement,
    hoverText: "検索",
    hoverTextTestId: "search-text",
  };

  return (
    <>
      {/* コマンドパレットを表示させるボタン */}
      <CustomIconButton {...searchButtonProps} />

      {/* コマンドパレット */}
      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setIsOpen}
        search={search}
        isOpen={isOpen}
        page={page}
      >
        <CommandPalette.Page id='root'>
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>
      </CommandPalette>
    </>
  );
};
