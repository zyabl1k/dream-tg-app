import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui-shad-cn/ui/drawer.tsx'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { useStore } from '@nanostores/react'
import { dreamStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'

export const DrawerDreamInput = () => {
  const dreamValue = useStore(dreamStore)
  const stepsValue = useStore(stepsStore)

  return (
    <Drawer>
      <DrawerTrigger
        disabled={stepsValue > 0}
        className={cn(stepsValue > 0 && 'pointer-events-none')}
      >
        <div
          className={cn(
            'relative h-96 cursor-pointer rounded-xl p-4 text-start transition-transform duration-1000',
            stepsValue > 0 ? 'rotate-y-180' : ''
          )}
        >
          {/* Лицевая сторона */}
          <div
            className={cn(
              'absolute inset-0 z-10 flex rotate-3 items-start justify-start rounded-xl bg-white p-4 shadow-insertBottom',
              stepsValue > 0 && 'hidden'
            )}
          >
            <p className="no-scrollbar max-h-[345px] overflow-x-hidden text-ellipsis break-words text-xl font-medium text-muted">
              {dreamValue.length ? dreamValue : 'Опишите свой сон...'}
            </p>
          </div>
          <div
            className={cn(
              'absolute inset-0 z-10 flex rotate-3 items-center justify-center rounded-xl bg-white p-4 shadow-insertBottom',
              stepsValue > 0 ? 'block' : 'hidden'
            )}
          >
            <p className="rotate-y-180 text-xl font-medium text-muted">
              Опишите, что происходит в вашей жизни.
            </p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={'hidden'}>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <form className="relative mx-auto w-full max-w-sm p-4">
          <Textarea
            maxLength={MAX_INPUT_VALUE}
            value={dreamValue}
            onChange={(e) => dreamStore.set(e.target.value)}
            placeholder={'Опишите свой сон...'}
            className={'h-[80vh] resize-none text-lg font-medium'}
            disabled={stepsValue > 0}
            minLength={4}
          />
          <DrawerFooter
            className={
              'w-full flex-row items-center justify-between bg-white p-0'
            }
          >
            <p className={'text-muted'}>
              Осталось {MAX_INPUT_VALUE - dreamValue.length} символов
            </p>
            <DrawerClose asChild>
              <Button
                onClick={() => stepsStore.set(1)}
                disabled={!dreamValue.length}
              >
                Дальше
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
