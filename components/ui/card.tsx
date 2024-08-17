import { Text, View } from 'react-native'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('border-border rounded-xl border', className)} {...props} />
}

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <Text
      className={cn('text-2xl font-semibold tracking-tight text-primary', className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4 pt-0', className)} {...props} />
}

function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View className={cn(className, 'flex flex-row items-center p-4 pt-0')} {...props} />
  )
}

interface SimpleCardProps {
  className?: string
  title?: string
  description?: string
  content?: string
  footer?: string
}
function SimpleCard({ className, title, description, content, footer }: SimpleCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && (
          <Text className='text-2xl font-semibold tracking-tight text-primary'>
            {title}
          </Text>
        )}
        {description && (
          <Text className='text-muted-foreground text-sm'>{description}</Text>
        )}
      </CardHeader>
      {content && (
        <CardContent>
          <Text className='text-base text-primary'>{content}</Text>
        </CardContent>
      )}
      {footer && (
        <CardFooter>
          <Text className='text-muted-foreground text-sm'>{footer}</Text>
        </CardFooter>
      )}
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SimpleCard
}
